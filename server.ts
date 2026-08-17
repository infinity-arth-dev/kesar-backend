/**
 * server.ts  ← ENTRY POINT
 * ──────────────────────────────────────────────────────────────────────────────
 * Responsibilities:
 *   1. Initialise & seed the database
 *   2. Build in-memory fallback state (used when DB is unavailable)
 *   3. Create the Express app (via createApp)
 *   4. Start the HTTP server and listen on HOST:PORT
 *
 * All route logic lives in app.ts → server/routes/*.ts
 * ──────────────────────────────────────────────────────────────────────────────
 */

import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_COUPONS,
  INITIAL_BLOG_POSTS,
  INITIAL_CMS_PAGES,
  INITIAL_ORDERS,
  DEMO_USERS,
} from './src/data/seedData';

import { initDatabase, seedDatabase } from './server/config/db';
import { config } from './server/config/config';
import { createApp } from './app';

async function startServer() {
  // ── 1. Database Init ─────────────────────────────────────────────────────────
  const dbConnected = await initDatabase();

  if (dbConnected) {
    await seedDatabase({
      categories: INITIAL_CATEGORIES,
      products: INITIAL_PRODUCTS as any[],
      reviews: INITIAL_REVIEWS,
      coupons: INITIAL_COUPONS,
      orders: INITIAL_ORDERS,
    });
  }

  // ── 2. In-Memory Fallback State ──────────────────────────────────────────────
  const appState = {
    dbConnected,
    fallbackProducts: dbConnected ? [] : [...INITIAL_PRODUCTS],
    fallbackReviews:  dbConnected ? [] : [...INITIAL_REVIEWS],
    fallbackCoupons:  dbConnected ? [] : [...INITIAL_COUPONS],
    fallbackOrders:   dbConnected ? [] : [...INITIAL_ORDERS],
    fallbackCategories: dbConnected ? [] : [...INITIAL_CATEGORIES],
    blogPosts: [...INITIAL_BLOG_POSTS],
    cmsPages:  [...INITIAL_CMS_PAGES],
    users:     [...DEMO_USERS],
  };

  // ── 3. Create Express App ────────────────────────────────────────────────────
  const app = createApp(appState);

  // ── 4. Start HTTP Server ─────────────────────────────────────────────────────
  const PORT = config.port;
  const HOST = config.host;

  app.listen(PORT, HOST, () => {
    console.log(
      `✅ Maa Kesar backend running on http://${HOST}:${PORT} [DB: ${
        dbConnected ? 'PostgreSQL ✓' : 'In-Memory fallback'
      }]`
    );
  });
}

startServer();
