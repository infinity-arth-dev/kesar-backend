import { Router } from 'express';
import * as reviewDb from '../db/reviewDb';
import * as productDb from '../db/productDb';
import { Review } from '../../src/types';

export function createReviewRoutes(
  dbConnected: boolean,
  fallbackReviews: Review[]
) {
  const router = Router();

  // GET all reviews (with optional filters)
  router.get('/', async (req, res) => {
    try {
      const { productId, approvedOnly } = req.query as any;
      if (dbConnected) {
        const reviews = await reviewDb.getReviews({
          productId,
          approvedOnly: approvedOnly !== 'false',
        });
        return res.json(reviews);
      }
      let result = [...fallbackReviews] as any[];
      if (productId) result = result.filter((r) => r.productId === productId);
      if (approvedOnly !== 'false') result = result.filter((r) => r.isApproved);
      res.json(result);
    } catch (err: any) {
      console.error('[reviews GET]', err.message);
      res.json(fallbackReviews);
    }
  });

  // POST submit a review
  router.post('/', async (req, res) => {
    const { productId, authorName, rating, title, body } = req.body;
    if (!productId || !authorName || !rating || !body) {
      return res.status(400).json({ message: 'Missing review details' });
    }
    try {
      if (dbConnected) {
        const prod = await productDb.getProductBySlug(productId);
        const newReview = await reviewDb.createReview({
          id: `rev-${Date.now()}`,
          productId,
          productTitle: prod ? prod.title : 'Maa Kesar Saffron Product',
          authorName,
          rating: Number(rating),
          title: title || 'Pure Kashmir Quality',
          body,
          isApproved: true,
          createdAt: new Date().toISOString(),
        });
        await reviewDb.updateProductRating(productId);
        return res.json(newReview);
      }
      const newReview: Review = {
        id: `rev-${Date.now()}`,
        productId,
        authorName,
        rating: Number(rating),
        title: title || 'Pure Kashmir Quality',
        body,
        isApproved: true,
        createdAt: new Date().toISOString().split('T')[0],
      };
      fallbackReviews.unshift(newReview);
      res.json(newReview);
    } catch (err: any) {
      console.error('[review POST]', err.message);
      res.status(500).json({ message: 'Failed to submit review' });
    }
  });

  // PUT approve/reject a review (admin)
  router.put('/:id/approve', async (req, res) => {
    try {
      if (dbConnected) {
        const review = await reviewDb.approveReview(req.params.id, req.body.isApproved ?? true);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        return res.json(review);
      }
      const review = fallbackReviews.find((r: any) => r.id === req.params.id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
      (review as any).isApproved = req.body.isApproved ?? true;
      res.json(review);
    } catch (err: any) {
      console.error('[review approve]', err.message);
      res.status(500).json({ message: 'Failed to update review' });
    }
  });

  return router;
}
