import { pool } from '../config/db';
import { Order } from '../../src/types';

const rowToOrder = (row: any): Order => ({
  id: row.id,
  orderNumber: row.order_number,
  userId: row.user_id,
  customerName: row.customer_name,
  customerEmail: row.customer_email,
  customerPhone: row.customer_phone,
  items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items,
  subtotal: parseFloat(row.subtotal),
  shippingFee: parseFloat(row.shipping_fee || 0),
  discount: parseFloat(row.discount || 0),
  total: parseFloat(row.total),
  status: row.status,
  paymentId: row.payment_id,
  paymentMethod: row.payment_method,
  shippingAddress: typeof row.shipping_address === 'string'
    ? JSON.parse(row.shipping_address)
    : row.shipping_address,
  estimatedDelivery: row.estimated_delivery,
  createdAt: row.created_at,
});

export const getAllOrders = async (): Promise<Order[]> => {
  const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
  return result.rows.map(rowToOrder);
};

export const getOrderById = async (id: string): Promise<Order | null> => {
  const result = await pool.query(
    `SELECT * FROM orders WHERE id = $1 OR order_number = $1 LIMIT 1`,
    [id]
  );
  if (result.rows.length === 0) return null;
  return rowToOrder(result.rows[0]);
};

export const getOrdersByUser = async (userId: string): Promise<Order[]> => {
  const result = await pool.query(
    `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows.map(rowToOrder);
};

export const createOrder = async (data: Order): Promise<Order> => {
  const result = await pool.query(
    `INSERT INTO orders
       (id, order_number, user_id, customer_name, customer_email, customer_phone,
        items, subtotal, shipping_fee, discount, total, status, payment_id,
        payment_method, shipping_address, estimated_delivery, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
     RETURNING *`,
    [
      data.id, data.orderNumber, data.userId || null,
      data.customerName, data.customerEmail, data.customerPhone || null,
      JSON.stringify(data.items),
      data.subtotal, data.shippingFee || 0, data.discount || 0, data.total,
      data.status || 'PROCESSING',
      data.paymentId || null, data.paymentMethod || null,
      JSON.stringify(data.shippingAddress),
      data.estimatedDelivery || null, data.createdAt,
    ]
  );
  return rowToOrder(result.rows[0]);
};

export const updateOrderStatus = async (id: string, status: string): Promise<Order | null> => {
  const result = await pool.query(
    `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  if (result.rows.length === 0) return null;
  return rowToOrder(result.rows[0]);
};
