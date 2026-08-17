import { Router } from 'express';
import * as productDb from '../db/productDb';
import { Product } from '../../src/types';

// Track live viewers per product (slug -> Set of socket/client session IDs)
const activeViewersMap = new Map<string, Map<string, number>>();

// Clean stale viewers every 10s (if no heartbeat in 15 seconds)
setInterval(() => {
  const now = Date.now();
  activeViewersMap.forEach((viewers, slug) => {
    viewers.forEach((lastSeen, sessionId) => {
      if (now - lastSeen > 15000) {
        viewers.delete(sessionId);
      }
    });
    if (viewers.size === 0) {
      activeViewersMap.delete(slug);
    }
  });
}, 10000);

export function createProductRoutes(
  dbConnected: boolean,
  fallbackProducts: Product[]
) {
  const router = Router();

  // GET all products
  router.get('/', async (req, res) => {
    try {
      if (dbConnected) {
        const products = await productDb.getAllProducts(req.query as any);
        return res.json(products);
      }
      const { category, search, maxPrice, sort } = req.query as any;
      let list = [...fallbackProducts];

      if (category) {
        list = list.filter(
          (p) =>
            p.categoryId === category ||
            p.categoryName?.toLowerCase() === category.toLowerCase() ||
            (category === 'retail-packs' && p.categoryId === 'cat-retail') ||
            (category === 'combo-packs' && p.categoryId === 'cat-combos') ||
            (category === 'bestsellers' && (p.isBestSeller || p.categoryId === 'cat-bestsellers'))
        );
      }
      if (maxPrice) {
        list = list.filter((p) => p.basePrice <= Number(maxPrice));
      }
      if (search) {
        const query = search.toLowerCase();
        list = list.filter((p) => p.title.toLowerCase().includes(query));
      }
      if (sort === 'price-asc') list.sort((a, b) => a.basePrice - b.basePrice);
      if (sort === 'price-desc') list.sort((a, b) => b.basePrice - a.basePrice);

      res.json(list);
    } catch (err: any) {
      console.error('[products GET]', err.message);
      res.json(fallbackProducts);
    }
  });

  // Heartbeat endpoint to register/ping presence
  router.post('/:slug/viewing', (req, res) => {
    const { slug } = req.params;
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ message: 'sessionId required' });
    }
    if (!activeViewersMap.has(slug)) {
      activeViewersMap.set(slug, new Map());
    }
    const viewers = activeViewersMap.get(slug)!;
    viewers.set(sessionId, Date.now());
    res.json({ activeViewers: viewers.size });
  });

  // Unregister presence when leaving page
  router.post('/:slug/leave', (req, res) => {
    const { slug } = req.params;
    const { sessionId } = req.body;
    if (slug && sessionId && activeViewersMap.has(slug)) {
      activeViewersMap.get(slug)!.delete(sessionId);
    }
    res.json({ success: true });
  });

  // GET product by slug
  router.get('/:slug', async (req, res) => {
    try {
      if (dbConnected) {
        const product = await productDb.getProductBySlug(req.params.slug);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        return res.json(product);
      }
      const product = fallbackProducts.find(
        (p: any) => p.slug === req.params.slug || p.id === req.params.slug
      );
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (err: any) {
      console.error('[product GET slug]', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // POST create product
  router.post('/', async (req, res) => {
    try {
      const id = `prod-${Date.now()}`;
      if (dbConnected) {
        const created = await productDb.createProduct({
          ...req.body,
          id,
          createdAt: new Date().toISOString(),
          rating: 5.0,
          reviewCount: 0,
        });
        return res.json(created);
      }
      const newProduct: Product = {
        ...req.body,
        id,
        createdAt: new Date().toISOString(),
        rating: 5.0,
        reviewCount: 0,
      };
      fallbackProducts.unshift(newProduct);
      res.json(newProduct);
    } catch (err: any) {
      console.error('[product POST]', err.message);
      res.status(500).json({ message: 'Failed to create product', error: err.message });
    }
  });

  // PUT update product
  router.put('/:id', async (req, res) => {
    try {
      if (dbConnected) {
        const updated = await productDb.updateProduct(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: 'Product not found' });
        return res.json(updated);
      }
      const idx = fallbackProducts.findIndex((p: any) => p.id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Product not found' });
      fallbackProducts[idx] = { ...fallbackProducts[idx], ...req.body };
      res.json(fallbackProducts[idx]);
    } catch (err: any) {
      console.error('[product PUT]', err.message);
      res.status(500).json({ message: 'Failed to update product', error: err.message });
    }
  });

  // DELETE product
  router.delete('/:id', async (req, res) => {
    try {
      if (dbConnected) {
        await productDb.deleteProduct(req.params.id);
        return res.json({ success: true });
      }
      const idx = fallbackProducts.findIndex((p: any) => p.id === req.params.id);
      if (idx !== -1) fallbackProducts.splice(idx, 1);
      res.json({ success: true });
    } catch (err: any) {
      console.error('[product DELETE]', err.message);
      res.status(500).json({ message: 'Failed to delete product', error: err.message });
    }
  });

  return router;
}
