import dotenv from 'dotenv';
dotenv.config();

const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'vineet';
const dbHost = process.env.DB_HOST || '192.168.1.42';
const dbPort = process.env.DB_PORT || '5432';
const dbName = process.env.DB_NAME || 'maa_kesar_db';

const defaultConnString = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

export const config = {
  jwtSecret: process.env.JWT_SECRET || 'maakesar-jwt-secret-key-2026-secure',
  jwtExpiresIn: '24h',
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT || '5000', 10),
  db: {
    connectionString: process.env.DATABASE_URL || defaultConnString,
    host: dbHost,
    port: parseInt(dbPort, 10),
    user: dbUser,
    password: dbPassword,
    database: dbName,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  },
};
