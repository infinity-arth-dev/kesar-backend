import { pool } from '../config/db';
import { Category } from '../../src/types';

const rowToCategory = (row: any): Category => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  description: row.description,
  imageUrl: row.image_url,
});

export const getAllCategories = async (): Promise<Category[]> => {
  const result = await pool.query('SELECT * FROM categories ORDER BY name ASC');
  return result.rows.map(rowToCategory);
};

export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  const result = await pool.query('SELECT * FROM categories WHERE slug = $1 LIMIT 1', [slug]);
  if (result.rows.length === 0) return null;
  return rowToCategory(result.rows[0]);
};
