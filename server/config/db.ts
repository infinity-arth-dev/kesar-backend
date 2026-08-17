import { Pool } from 'pg';
import { config } from './config';
import { Category, Product, Review, Coupon, Order } from '../../src/types';

export const pool = new Pool({
  connectionString: config.db.connectionString,
  ssl: config.db.ssl,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export const initDatabase = async (): Promise<boolean> => {
  try {
    const client = await pool.connect();
    client.release();

    // Ensure all tables exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        password_hash TEXT NOT NULL,
        role VARCHAR(50) DEFAULT 'CUSTOMER',
        created_at VARCHAR(50) NOT NULL,
        addresses JSONB DEFAULT '[]'::jsonb
      );

      ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(50);

      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        image_url TEXT
      );

      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255),
        description TEXT,
        shipping_info TEXT,
        return_info TEXT,
        images JSONB DEFAULT '[]'::jsonb,
        variants JSONB DEFAULT '[]'::jsonb,
        category_id VARCHAR(255),
        category_name VARCHAR(255),
        base_price NUMERIC NOT NULL,
        compare_at_price NUMERIC,
        weight_grams INT,
        is_best_seller BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        rating NUMERIC DEFAULT 5.0,
        review_count INT DEFAULT 0,
        created_at VARCHAR(50) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(255) PRIMARY KEY,
        product_id VARCHAR(255) NOT NULL,
        product_title VARCHAR(255),
        user_id VARCHAR(255),
        author_name VARCHAR(255) NOT NULL,
        rating INT NOT NULL,
        title VARCHAR(255),
        body TEXT NOT NULL,
        is_approved BOOLEAN DEFAULT true,
        created_at VARCHAR(50) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS coupons (
        id VARCHAR(255) PRIMARY KEY,
        code VARCHAR(100) UNIQUE NOT NULL,
        type VARCHAR(50) NOT NULL,
        value NUMERIC NOT NULL,
        min_order_value NUMERIC DEFAULT 0,
        expires_at VARCHAR(50),
        is_active BOOLEAN DEFAULT true
      );

      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(255) PRIMARY KEY,
        order_number VARCHAR(100) UNIQUE NOT NULL,
        user_id VARCHAR(255),
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50),
        items JSONB NOT NULL,
        subtotal NUMERIC NOT NULL,
        shipping_fee NUMERIC DEFAULT 0,
        discount NUMERIC DEFAULT 0,
        total NUMERIC NOT NULL,
        status VARCHAR(50) DEFAULT 'PAID',
        payment_id VARCHAR(255),
        payment_method VARCHAR(100),
        shipping_address JSONB NOT NULL,
        estimated_delivery VARCHAR(100),
        created_at VARCHAR(50) NOT NULL
      );
    `);
    console.log('[DB] PostgreSQL database connected and tables verified.');
    return true;
  } catch (error: any) {
    console.warn('[DB] Could not connect to PostgreSQL database:', error.message || error);
    return false;
  }
};

export const seedDatabase = async (initialData: {
  categories: Category[];
  products: Product[];
  reviews: Review[];
  coupons: Coupon[];
  orders: Order[];
}) => {
  try {
    // Seed categories if empty
    const catRes = await pool.query('SELECT COUNT(*) FROM categories');
    if (parseInt(catRes.rows[0].count) === 0) {
      for (const cat of initialData.categories) {
        await pool.query(
          `INSERT INTO categories (id, name, slug, description, image_url) VALUES ($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING`,
          [cat.id, cat.name, cat.slug, cat.description, cat.imageUrl || null]
        );
      }
    }

    // Seed products (always insert any missing seed products)
    for (const p of initialData.products) {
      await pool.query(
        `INSERT INTO products (id, slug, title, subtitle, description, shipping_info, return_info, images, variants, category_id, category_name, base_price, compare_at_price, weight_grams, is_best_seller, is_active, rating, review_count, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) ON CONFLICT (id) DO NOTHING`,
        [
          p.id, p.slug, p.title, p.subtitle || null, p.description || '', p.shippingInfo || null, p.returnInfo || null,
          JSON.stringify(p.images || []), JSON.stringify(p.variants || []), p.categoryId || null, p.categoryName || null,
          p.basePrice || 0, p.compareAtPrice || null, p.weightGrams || null, p.isBestSeller || false, p.isActive !== false,
          p.rating || 5.0, p.reviewCount || 0, p.createdAt || new Date().toISOString()
        ]
      );
    }

    // Seed reviews if empty
    const revRes = await pool.query('SELECT COUNT(*) FROM reviews');
    if (parseInt(revRes.rows[0].count) === 0) {
      for (const r of initialData.reviews) {
        await pool.query(
          `INSERT INTO reviews (id, product_id, product_title, user_id, author_name, rating, title, body, is_approved, created_at)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT DO NOTHING`,
          [
            r.id, r.productId, r.productTitle || null, r.userId || null,
            r.authorName, r.rating, r.title, r.body, r.isApproved !== false, r.createdAt
          ]
        );
      }
    }

    // Seed coupons if empty
    const coupRes = await pool.query('SELECT COUNT(*) FROM coupons');
    if (parseInt(coupRes.rows[0].count) === 0) {
      for (const c of initialData.coupons) {
        await pool.query(
          `INSERT INTO coupons (id, code, type, value, min_order_value, expires_at, is_active)
           VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING`,
          [c.id, c.code.toUpperCase(), c.type, c.value, c.minOrderValue || 0, c.expiresAt || null, c.isActive !== false]
        );
      }
    }

    console.log('[DB] Seeding completed.');
  } catch (err: any) {
    console.error('[DB] Seeding failed:', err.message);
  }
};
