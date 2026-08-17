import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {
  BlogPost,
  CmsPage,
  Coupon,
  Order,
  Product,
  Review,
  User,
} from './src/types';

// ─── Route factories ───────────────────────────────────────────────────────────
import authRoutes from './server/routes/authRoutes';
import { authController } from './server/controllers/authController';
import { createProductRoutes } from './server/routes/productRoutes';
import { createReviewRoutes } from './server/routes/reviewRoutes';
import { createCouponRoutes } from './server/routes/couponRoutes';
import { createOrderRoutes } from './server/routes/orderRoutes';
import { createAdminRoutes } from './server/routes/adminRoutes';
import { createContentRoutes } from './server/routes/contentRoutes';
import { userRepository } from './server/data/userRepository';
import { authenticateToken, requireAdmin } from './server/middlewares/authMiddleware';

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface AppState {
  dbConnected: boolean;
  fallbackProducts: Product[];
  fallbackReviews: Review[];
  fallbackCoupons: Coupon[];
  fallbackOrders: Order[];
  fallbackCategories: any[];
  blogPosts: BlogPost[];
  cmsPages: CmsPage[];
  users: User[];
}

// ──────────────────────────────────────────────────────────────────────────────
// createApp
// Accepts the pre-initialised DB state and returns a fully configured Express app.
// ──────────────────────────────────────────────────────────────────────────────
export function createApp(state: AppState) {
  const app = express();

  // ── Middleware ──────────────────────────────────────────────────────────────
  app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://maa-kesar.infinityfreeapp.com', 'http://192.168.1.42:5173', 'http://localhost:3000'],
    credentials: true, // ← required for cookies to be sent cross-origin
  }));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(cookieParser()); // ← parse cookies from every request

  // ── Health check ────────────────────────────────────────────────────────────
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      db: state.dbConnected ? 'postgresql' : 'in-memory',
      timestamp: new Date().toISOString(),
    });
  });

  // ── Global Admin Protection Middleware ─────────────────────────────────────
  // ALL requests matching /api/admin/* MUST provide a valid JWT Token with ADMIN role.
  app.use('/api/admin', authenticateToken as any, requireAdmin as any);

  // ── 1. Auth ─────────────────────────────────────────────────────────────────
  app.use('/api/auth', authRoutes);
  app.post('/api/auth/address', authenticateToken as any, (req, res) => authController.addAddress(req, res));

  // ── 2. Categories (Public) ──────────────────────────────────────────────────
  app.get('/api/categories', async (req, res) => {
    try {
      if (state.dbConnected) {
        const { getAllCategories } = await import('./server/db/categoryDb');
        return res.json(await getAllCategories());
      }
      res.json(state.fallbackCategories);
    } catch (err: any) {
      console.error('[categories GET]', err.message);
      res.json(state.fallbackCategories);
    }
  });

  // ── 3. Products (GET /api/products is PUBLIC) ──────────────────────────────
  const productRouter = createProductRoutes(state.dbConnected, state.fallbackProducts);
  app.use('/api/products', productRouter);
  app.use('/api/admin/products', productRouter); // protected by /api/admin middleware

  // ── 4. Reviews (GET /api/reviews is PUBLIC) ────────────────────────────────
  const reviewRouter = createReviewRoutes(state.dbConnected, state.fallbackReviews);
  app.use('/api/reviews', reviewRouter);
  app.use('/api/admin/reviews', reviewRouter); // protected by /api/admin middleware

  // ── 5. Coupons ──────────────────────────────────────────────────────────────
  const couponRouter = createCouponRoutes(state.dbConnected, state.fallbackCoupons);
  app.use('/api/coupons', couponRouter);
  app.use('/api/admin/coupons', couponRouter); // protected by /api/admin middleware

  // ── 6. Orders ───────────────────────────────────────────────────────────────
  const orderRouter = createOrderRoutes(
    state.dbConnected,
    state.fallbackOrders,
    state.fallbackCoupons
  );
  app.use('/api/orders', orderRouter);
  app.use('/api/admin/orders', orderRouter); // protected by /api/admin middleware
  app.use('/api/razorpay', orderRouter);

  // ── 7. Blog & CMS ───────────────────────────────────────────────────────────
  const contentRouter = createContentRoutes(state.blogPosts, state.cmsPages);
  app.use('/api', contentRouter);

  // ── 8. Admin Routes ─────────────────────────────────────────────────────────
  const adminRouter = createAdminRoutes(
    state.dbConnected,
    state.fallbackOrders,
    state.fallbackProducts,
    state.fallbackReviews
  );
  app.use('/api/admin', adminRouter);

  // ── 9. Customers / Users ────────────────────────────────────────────────────
  const handleGetCustomers = async (req: express.Request, res: express.Response) => {
    try {
      const allUsers = await userRepository.getAll();
      res.json(allUsers);
    } catch (err: any) {
      console.error('[customers GET]', err.message);
      res.status(500).json({ message: 'Failed to fetch customers' });
    }
  };
  app.get('/api/admin/customers', handleGetCustomers);
  app.get('/api/customers', authenticateToken as any, requireAdmin as any, handleGetCustomers);

  // ── Global Error Handler ────────────────────────────────────────────────────
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Global Error:', err);
    if (err.message) {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  });

  return app;
}
