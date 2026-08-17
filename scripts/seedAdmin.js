import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const { Pool, Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'vineet';
const dbHost = process.env.DB_HOST || '192.168.1.42';
const dbPort = process.env.DB_PORT || '5432';
const dbName = process.env.DB_NAME || 'maa_kesar_db';

async function ensureDatabaseExists() {
  const rootClient = new Client({
    user: dbUser,
    password: dbPassword,
    host: dbHost,
    port: parseInt(dbPort, 10),
    database: 'postgres',
  });

  try {
    await rootClient.connect();
    const res = await rootClient.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
    if (res.rows.length === 0) {
      console.log(`[Seed] Creating database "${dbName}"...`);
      await rootClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`[Seed] Database "${dbName}" created successfully!`);
    } else {
      console.log(`[Seed] Database "${dbName}" exists.`);
    }
  } catch (err) {
    console.warn(`[Seed] Could not auto-create database (might already exist or permission restricted):`, err.message);
  } finally {
    await rootClient.end().catch(() => {});
  }
}

async function seed() {
  await ensureDatabaseExists();

  const connectionString = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
  console.log(`[Seed] Connecting to PostgreSQL at ${dbHost}:${dbPort}/${dbName}...`);

  const pool = new Pool({
    connectionString,
    connectionTimeoutMillis: 5000,
  });

  try {
    const sqlPath = path.join(__dirname, '../server/db/schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    await pool.query(sql);
    console.log('\n==================================================');
    console.log('✅ SUCCESS: Admin user inserted into PostgreSQL!');
    console.log('==================================================');
    console.log('Database: ' + dbName);
    console.log('Host:     ' + dbHost);
    console.log('User:     ' + dbUser);
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
