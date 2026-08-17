-- PostgreSQL Database Schema for Maa Kesar backend auth

-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'CUSTOMER',
    created_at VARCHAR(50) NOT NULL,
    addresses JSONB DEFAULT '[]'::jsonb
);

-- 2. Insert Admin User with Bcrypt Hashed Password (Password: 12345678)
-- Email: admin@gmail.com
INSERT INTO users (id, name, email, password_hash, role, created_at, addresses)
VALUES (
    'usr-admin-001',
    'Admin User',
    'admin@gmail.com',
    '$2b$10$EtyzAKs/rp89wOvKiA7Q0e.fg6DQoc4WJEx7fFnb8nSKTvbpJvOGG',
    'ADMIN',
    TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),
    '[]'::jsonb
)
ON CONFLICT (email) DO UPDATE 
SET password_hash = EXCLUDED.password_hash, role = 'ADMIN';
