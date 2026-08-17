import { Router } from 'express';
import * as productDb from '../db/productDb';
import * as orderDb from '../db/orderDb';
import * as reviewDb from '../db/reviewDb';

export function createAdminRoutes(
  dbConnected: boolean,
  fallbackOrders: any[],
  fallbackProducts: any[],
  fallbackReviews: any[]
) {
  const router = Router();

  // GET aggregated dashboard stats
  router.get('/stats', async (req, res) => {
    try {
      const [allOrders, allProducts, allReviews] = await Promise.all([
        dbConnected ? orderDb.getAllOrders() : Promise.resolve(fallbackOrders),
        dbConnected ? productDb.getAllProducts({}) : Promise.resolve(fallbackProducts),
        dbConnected
          ? reviewDb.getReviews({ approvedOnly: false })
          : Promise.resolve(fallbackReviews),
      ]);

      const totalRevenue = allOrders.reduce(
        (sum: number, o: any) => sum + (o.status !== 'CANCELLED' ? Number(o.total) : 0),
        0
      );

      res.json({
        totalOrders: allOrders.length,
        totalRevenue,
        activeProducts: allProducts.filter((p: any) => p.isActive).length,
        pendingReviews: allReviews.filter((r: any) => !r.isApproved).length,
        recentOrders: allOrders.slice(0, 5),
      });
    } catch (err: any) {
      console.error('[admin stats]', err.message);
      res.json({
        totalOrders: 0,
        totalRevenue: 0,
        activeProducts: 0,
        pendingReviews: 0,
        recentOrders: [],
      });
    }
  });

  return router;
}
