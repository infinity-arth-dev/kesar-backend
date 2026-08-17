import { Router } from 'express';
import * as couponDb from '../db/couponDb';
import { Coupon } from '../../src/types';

export function createCouponRoutes(
  dbConnected: boolean,
  fallbackCoupons: Coupon[]
) {
  const router = Router();

  // GET all coupons
  router.get('/', async (req, res) => {
    try {
      if (dbConnected) return res.json(await couponDb.getAllCoupons());
      res.json(fallbackCoupons);
    } catch (err: any) {
      res.json(fallbackCoupons);
    }
  });

  // GET validate coupon code
  router.get('/validate', async (req, res) => {
    const { code, subtotal } = req.query as any;
    try {
      let coupon: any = null;
      if (dbConnected) {
        coupon = await couponDb.getCouponByCode(code || '');
      } else {
        coupon = fallbackCoupons.find(
          (c: any) => c.code.toUpperCase() === (code as string)?.toUpperCase() && c.isActive
        );
      }

      if (!coupon) {
        return res.status(400).json({ message: 'Invalid or inactive coupon code' });
      }

      const sub = Number(subtotal) || 0;
      if (coupon.minOrderValue && sub < coupon.minOrderValue) {
        return res.status(400).json({
          message: `Coupon requires minimum order value of ₹${coupon.minOrderValue}`,
        });
      }

      let discountAmount = 0;
      if (coupon.type === 'PERCENT') {
        discountAmount = Math.round((sub * coupon.value) / 100);
      } else {
        discountAmount = coupon.value;
      }

      res.json({ coupon, discountAmount });
    } catch (err: any) {
      console.error('[coupon validate]', err.message);
      res.status(500).json({ message: 'Failed to validate coupon' });
    }
  });

  // POST create coupon
  router.post('/', async (req, res) => {
    try {
      const discountType = req.body.discountType || req.body.type || 'PERCENTAGE';
      const discountValue = Number(req.body.discountValue ?? req.body.value ?? 0);
      const minSubtotal = Number(req.body.minSubtotal ?? req.body.minOrderValue ?? 0);
      const internalType: 'PERCENT' | 'FLAT' = discountType === 'PERCENTAGE' ? 'PERCENT' : discountType;

      if (dbConnected) {
        const created = await couponDb.createCoupon({
          id: `coup-${Date.now()}`,
          code: (req.body.code || '').toUpperCase(),
          type: internalType,
          value: discountValue,
          minOrderValue: minSubtotal,
        });
        return res.json(created);
      }

      const newCoupon: Coupon = {
        id: `cpn-${Date.now()}`,
        code: req.body.code.toUpperCase(),
        type: internalType,
        value: discountValue,
        minOrderValue: minSubtotal,
        isActive: true,
      };
      fallbackCoupons.push(newCoupon);
      res.json(newCoupon);
    } catch (err: any) {
      console.error('[coupon POST]', err.message);
      res.status(500).json({ message: 'Failed to create coupon', error: err.message });
    }
  });

  // DELETE coupon by ID
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      if (dbConnected) {
        await couponDb.deleteCoupon(id);
      } else {
        const idx = fallbackCoupons.findIndex((c) => c.id === id);
        if (idx !== -1) {
          fallbackCoupons.splice(idx, 1);
        }
      }
      res.json({ message: 'Coupon deleted successfully' });
    } catch (err: any) {
      console.error('[coupon DELETE]', err.message);
      res.status(500).json({ message: 'Failed to delete coupon', error: err.message });
    }
  });

  return router;
}
