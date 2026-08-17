import { pool } from '../config/db';
import { Coupon } from '../../src/types';

const rowToCoupon = (row: any): Coupon => ({
  id: row.id,
  code: row.code,
  type: row.type as 'PERCENT' | 'FLAT',
  value: parseFloat(row.value),
  minOrderValue: row.min_order_value ? parseFloat(row.min_order_value) : undefined,
  expiresAt: row.expires_at,
  isActive: row.is_active,
});

export const getAllCoupons = async (): Promise<Coupon[]> => {
  const result = await pool.query('SELECT * FROM coupons ORDER BY id ASC');
  return result.rows.map(rowToCoupon);
};

export const getCouponByCode = async (code: string): Promise<Coupon | null> => {
  const result = await pool.query(
    `SELECT * FROM coupons WHERE UPPER(code) = UPPER($1) AND is_active = true LIMIT 1`,
    [code]
  );
  if (result.rows.length === 0) return null;
  return rowToCoupon(result.rows[0]);
};

export const createCoupon = async (data: {
  id: string;
  code: string;
  type: 'PERCENT' | 'FLAT';
  value: number;
  minOrderValue?: number;
  expiresAt?: string;
}): Promise<Coupon> => {
  const result = await pool.query(
    `INSERT INTO coupons (id, code, type, value, min_order_value, expires_at, is_active)
     VALUES ($1,$2,$3,$4,$5,$6,true)
     RETURNING *`,
    [
      data.id, data.code.toUpperCase(), data.type,
      data.value, data.minOrderValue || 0, data.expiresAt || null,
    ]
  );
  return rowToCoupon(result.rows[0]);
};

export const deactivateCoupon = async (id: string): Promise<boolean> => {
  const result = await pool.query(
    `UPDATE coupons SET is_active = false WHERE id = $1`,
    [id]
  );
  return (result.rowCount ?? 0) > 0;
};

export const deleteCoupon = async (id: string): Promise<boolean> => {
  const result = await pool.query(`DELETE FROM coupons WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
};
