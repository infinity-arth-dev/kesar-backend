import { Router } from 'express';
import * as orderDb from '../db/orderDb';
import * as couponDb from '../db/couponDb';
import { Order, Coupon } from '../../src/types';

export function createOrderRoutes(
  dbConnected: boolean,
  fallbackOrders: Order[],
  fallbackCoupons: Coupon[]
) {
  const router = Router();

  // Simulate a Razorpay order creation
  router.post('/razorpay/create-order', (req, res) => {
    const { amount } = req.body;
    res.json({
      id: `order_RZP_${Math.floor(10000000 + Math.random() * 90000000)}`,
      entity: 'order',
      amount: (amount || 0) * 100,
      currency: 'INR',
      status: 'created',
    });
  });

  // GET all orders
  router.get('/', async (req, res) => {
    try {
      if (dbConnected) return res.json(await orderDb.getAllOrders());
      res.json(fallbackOrders);
    } catch (err: any) {
      res.json(fallbackOrders);
    }
  });

  // GET single order by ID
  router.get('/:id', async (req, res) => {
    try {
      if (dbConnected) {
        const order = await orderDb.getOrderById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        return res.json(order);
      }
      const order = fallbackOrders.find(
        (o) => o.id === req.params.id || o.orderNumber === req.params.id
      );
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.json(order);
    } catch (err: any) {
      res.status(500).json({ message: 'Failed to get order' });
    }
  });

  // GET orders by user ID
  router.get('/user/:userId', async (req, res) => {
    try {
      if (dbConnected) return res.json(await orderDb.getOrdersByUser(req.params.userId));
      const userOrders = fallbackOrders.filter((o) => o.userId === req.params.userId);
      res.json(userOrders);
    } catch (err: any) {
      res.json([]);
    }
  });

  // POST place a new order
  router.post('/', async (req, res) => {
    const {
      userId, customerName, customerEmail, customerPhone,
      items, shippingAddress, paymentMethod, couponCode,
    } = req.body;

    if (!items || items.length === 0 || !customerEmail || !shippingAddress) {
      return res.status(400).json({ message: 'Missing order information' });
    }

    let subtotal = 0;
    const orderItems = items.map((it: any) => {
      subtotal += (it.price || 0) * (it.quantity || 1);
      return {
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: it.productId,
        variantId: it.variantId,
        title: it.title,
        variantLabel: it.variantLabel,
        price: it.price,
        quantity: it.quantity,
        imageUrl: it.imageUrl,
      };
    });

    let discount = 0;
    if (couponCode) {
      try {
        const c = dbConnected
          ? await couponDb.getCouponByCode(couponCode)
          : fallbackCoupons.find((cp: any) => cp.code.toUpperCase() === couponCode.toUpperCase());
        if (c && c.isActive) {
          discount = c.type === 'PERCENT' ? Math.round((subtotal * c.value) / 100) : c.value;
        }
      } catch {
        /* ignore coupon error */
      }
    }

    const shippingFee = subtotal - discount >= 499 ? 0 : 50;
    const total = Math.max(0, subtotal - discount + shippingFee);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `MK-${Math.floor(100000 + Math.random() * 900000)}`,
      userId,
      customerName,
      customerEmail,
      customerPhone: customerPhone || '+91 98765 43210',
      items: orderItems,
      subtotal,
      shippingFee,
      discount,
      total,
      status: 'PAID',
      paymentId: `pay_RZP_${Math.floor(10000000 + Math.random() * 90000000)}`,
      paymentMethod: paymentMethod || 'Razorpay UPI / Cards',
      shippingAddress,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
      ...req.body,
    };

    try {
      if (dbConnected) {
        const saved = await orderDb.createOrder(newOrder);
        return res.json(saved);
      }
      fallbackOrders.unshift(newOrder);
      res.json(newOrder);
    } catch (err: any) {
      console.error('[order POST]', err.message);
      res.status(500).json({ message: 'Failed to place order' });
    }
  });

  // PATCH / PUT update order status (admin)
  router.patch('/:id/status', async (req, res) => {
    try {
      if (dbConnected) {
        const order = await orderDb.updateOrderStatus(req.params.id, req.body.status);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        return res.json(order);
      }
      const order = fallbackOrders.find((o: any) => o.id === req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      (order as any).status = req.body.status;
      res.json(order);
    } catch (err: any) {
      res.status(500).json({ message: 'Failed to update order status' });
    }
  });

  return router;
}
