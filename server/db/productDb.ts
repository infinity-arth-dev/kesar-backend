import { pool } from '../config/db';
import { Product } from '../../src/types';

const rowToProduct = (row: any): Product => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  subtitle: row.subtitle,
  description: row.description,
  shippingInfo: row.shipping_info,
  returnInfo: row.return_info,
  images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images,
  variants: typeof row.variants === 'string' ? JSON.parse(row.variants) : row.variants,
  categoryId: row.category_id,
  categoryName: row.category_name,
  basePrice: parseFloat(row.base_price),
  compareAtPrice: row.compare_at_price ? parseFloat(row.compare_at_price) : undefined,
  weightGrams: row.weight_grams,
  isBestSeller: row.is_best_seller,
  isActive: row.is_active,
  rating: row.rating ? parseFloat(row.rating) : undefined,
  reviewCount: row.review_count,
  createdAt: row.created_at,
});

export const getAllProducts = async (filters: {
  category?: string;
  search?: string;
  sort?: string;
  isBestSeller?: string;
  minPrice?: string;
  maxPrice?: string;
}): Promise<Product[]> => {
  const conditions: string[] = ['is_active = true'];
  const params: any[] = [];
  let idx = 1;

  if (filters.category) {
    const rawCat = filters.category;
    let catVal = rawCat;
    if (catVal === 'retail-packs') catVal = 'cat-retail';
    else if (catVal === 'combo-packs') catVal = 'cat-combos';
    else if (catVal === 'bestsellers') catVal = 'cat-bestsellers';

    conditions.push(`(
      category_id = $${idx} 
      OR category_id = $${idx + 1}
      OR LOWER(category_name) = LOWER($${idx}) 
      OR LOWER(category_name) = LOWER($${idx + 1}) 
      OR LOWER(REPLACE(category_name, ' ', '-')) = LOWER($${idx}) 
      OR LOWER(REPLACE(category_name, ' ', '-')) = LOWER($${idx + 1})
    )`);
    params.push(catVal, rawCat);
    idx += 2;
  }
  if (filters.isBestSeller === 'true') {
    conditions.push(`is_best_seller = true`);
  }
  if (filters.search) {
    conditions.push(`(LOWER(title) LIKE $${idx} OR LOWER(subtitle) LIKE $${idx} OR LOWER(description) LIKE $${idx})`);
    params.push(`%${filters.search.toLowerCase()}%`);
    idx++;
  }
  if (filters.minPrice) {
    conditions.push(`base_price >= $${idx}`);
    params.push(Number(filters.minPrice));
    idx++;
  }
  if (filters.maxPrice) {
    conditions.push(`base_price <= $${idx}`);
    params.push(Number(filters.maxPrice));
    idx++;
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  let orderBy = 'ORDER BY created_at DESC';
  if (filters.sort === 'price-asc') orderBy = 'ORDER BY base_price ASC';
  else if (filters.sort === 'price-desc') orderBy = 'ORDER BY base_price DESC';
  else if (filters.sort === 'rating') orderBy = 'ORDER BY rating DESC';

  const result = await pool.query(`SELECT * FROM products ${where} ${orderBy}`, params);
  return result.rows.map(rowToProduct);
};

export const getProductBySlug = async (slugOrId: string): Promise<Product | null> => {
  const result = await pool.query(
    `SELECT * FROM products WHERE slug = $1 OR id = $1 LIMIT 1`,
    [slugOrId]
  );
  if (result.rows.length === 0) return null;
  return rowToProduct(result.rows[0]);
};

export const createProduct = async (data: Partial<Product> & { id: string }): Promise<Product> => {
  const result = await pool.query(
    `INSERT INTO products
       (id, slug, title, subtitle, description, shipping_info, return_info,
        images, variants, category_id, category_name, base_price,
        compare_at_price, weight_grams, is_best_seller, is_active,
        rating, review_count, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)
     RETURNING *`,
    [
      data.id,
      data.slug || data.title!.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      data.title,
      data.subtitle || null,
      data.description || '',
      data.shippingInfo || null,
      data.returnInfo || null,
      JSON.stringify(data.images || []),
      JSON.stringify(data.variants || []),
      data.categoryId || null,
      data.categoryName || null,
      data.basePrice || 0,
      data.compareAtPrice || null,
      data.weightGrams || null,
      data.isBestSeller || false,
      data.isActive !== false,
      data.rating || 5.0,
      data.reviewCount || 0,
      data.createdAt || new Date().toISOString(),
    ]
  );
  return rowToProduct(result.rows[0]);
};

export const updateProduct = async (id: string, data: Partial<Product>): Promise<Product | null> => {
  const fields: string[] = [];
  const params: any[] = [];
  let idx = 1;

  const mapping: Record<string, string> = {
    title: 'title', subtitle: 'subtitle', description: 'description',
    shippingInfo: 'shipping_info', returnInfo: 'return_info',
    slug: 'slug', categoryId: 'category_id', categoryName: 'category_name',
    basePrice: 'base_price', compareAtPrice: 'compare_at_price',
    weightGrams: 'weight_grams', isBestSeller: 'is_best_seller',
    isActive: 'is_active', rating: 'rating', reviewCount: 'review_count',
  };

  for (const [key, col] of Object.entries(mapping)) {
    if (key in data) {
      fields.push(`${col} = $${idx}`);
      params.push((data as any)[key]);
      idx++;
    }
  }
  if (data.images !== undefined) {
    fields.push(`images = $${idx}`);
    params.push(JSON.stringify(data.images));
    idx++;
  }
  if (data.variants !== undefined) {
    fields.push(`variants = $${idx}`);
    params.push(JSON.stringify(data.variants));
    idx++;
  }

  if (fields.length === 0) return getProductBySlug(id);

  params.push(id);
  const result = await pool.query(
    `UPDATE products SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    params
  );
  if (result.rows.length === 0) return null;
  return rowToProduct(result.rows[0]);
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const result = await pool.query(`DELETE FROM products WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
};
