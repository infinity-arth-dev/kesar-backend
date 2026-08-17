import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is not set. Aborting.');
  process.exit(1);
}

async function seed() {
  console.log(`[Seed] Connecting to PostgreSQL via DATABASE_URL...`);
  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }, // Railway Postgres often requires SSL
    connectionTimeoutMillis: 5000,
  });

  try {
    const sqlPath = path.join(__dirname, '../server/db/schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    await pool.query(sql);
    console.log('\n==================================================');
    console.log('✅ SUCCESS: Admin user inserted into PostgreSQL!');
    console.log('==================================================');
    console.log('Email:    admin@gmail.com');
    console.log('Password: 12345678');
    console.log('Role:     ADMIN');
    console.log('==================================================\n');
  } catch (err) {
    console.error('❌ Failed to execute seed query:', err.message);
  } finally {
    await pool.end();
  }
}

seed();