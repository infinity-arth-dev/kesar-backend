import { pool } from '../config/db';
import { Review } from '../../src/types';

const rowToReview = (row: any): Review => ({
  id: row.id,
  productId: row.product_id,
  productTitle: row.product_title,
  userId: row.user_id,
  authorName: row.author_name,
  rating: parseInt(row.rating),
  title: row.title,
  body: row.body,
  isApproved: row.is_approved,
  createdAt: row.created_at,
});

export const getReviews = async (filters: {
  productId?: string;
  approvedOnly?: boolean;
}): Promise<Review[]> => {
  const conditions: string[] = [];
  const params: any[] = [];
  let idx = 1;

  if (filters.productId) {
    conditions.push(`product_id = $${idx}`);
    params.push(filters.productId);
    idx++;
  }
  if (filters.approvedOnly !== false) {
    conditions.push('is_approved = true');
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const result = await pool.query(
    `SELECT * FROM reviews ${where} ORDER BY created_at DESC`,
    params
  );
  return result.rows.map(rowToReview);
};

export const createReview = async (data: Omit<Review, 'id'> & { id: string }): Promise<Review> => {
  const result = await pool.query(
    `INSERT INTO reviews
       (id, product_id, product_title, user_id, author_name, rating, title, body, is_approved, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING *`,
    [
      data.id, data.productId, data.productTitle || null, data.userId || null,
      data.authorName, data.rating, data.title, data.body,
      data.isApproved !== false, data.createdAt,
    ]
  );
  return rowToReview(result.rows[0]);
};

export const approveReview = async (id: string, isApproved: boolean): Promise<Review | null> => {
  const result = await pool.query(
    `UPDATE reviews SET is_approved = $1 WHERE id = $2 RETURNING *`,
    [isApproved, id]
  );
  if (result.rows.length === 0) return null;
  return rowToReview(result.rows[0]);
};

export const updateProductRating = async (productId: string): Promise<void> => {
  await pool.query(
    `UPDATE products
     SET rating = (
       SELECT ROUND(AVG(rating)::numeric, 1) FROM reviews WHERE product_id = $1 AND is_approved = true
     ),
     review_count = (
       SELECT COUNT(*) FROM reviews WHERE product_id = $1 AND is_approved = true
     )
     WHERE id = $1`,
    [productId]
  );
};
