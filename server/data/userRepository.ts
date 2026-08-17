import bcrypt from 'bcryptjs';
import { User } from '../../src/types';
import { DEMO_USERS } from '../../src/data/seedData';
import { query } from '../config/db';

export interface StoredUser extends User {
  passwordHash: string;
}

// Pre-generated bcrypt hashes for fallback/demo passwords:
const DEMO_USER_HASH = bcrypt.hashSync('password123', 10);
const DEMO_ADMIN_HASH = bcrypt.hashSync('admin123', 10);
const ADMIN_GMAIL_HASH = bcrypt.hashSync('12345678', 10);

const initialUsers: StoredUser[] = [
  {
    id: 'usr-admin-001',
    name: 'Admin User',
    email: 'admin@gmail.com',
    passwordHash: ADMIN_GMAIL_HASH,
    role: 'ADMIN',
    createdAt: new Date().toISOString().split('T')[0],
    addresses: [],
  },
  ...DEMO_USERS.map((user) => ({
    ...user,
    passwordHash: user.role === 'ADMIN' ? DEMO_ADMIN_HASH : DEMO_USER_HASH,
  })),
];

class UserRepository {
  private inMemoryUsers: StoredUser[] = [...initialUsers];

  async findByEmail(email: string): Promise<StoredUser | undefined> {
    const normalizedEmail = email.trim().toLowerCase();
    try {
      const res = await query(
        'SELECT id, name, email, phone, password_hash as "passwordHash", role, created_at as "createdAt", addresses FROM users WHERE LOWER(email) = $1',
        [normalizedEmail]
      );
      if (res.rows.length > 0) {
        const row = res.rows[0];
        let addrs = row.addresses;
        if (typeof addrs === 'string') {
          try { addrs = JSON.parse(addrs); } catch { addrs = []; }
        }
        return { ...row, addresses: addrs || [] };
      }
    } catch (err) {
      // Fallback to in-memory store if DB query fails or DB is offline
    }

    return this.inMemoryUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
  }

  async findById(id: string): Promise<StoredUser | undefined> {
    try {
      const res = await query(
        'SELECT id, name, email, phone, password_hash as "passwordHash", role, created_at as "createdAt", addresses FROM users WHERE id = $1',
        [id]
      );
      if (res.rows.length > 0) {
        const row = res.rows[0];
        let addrs = row.addresses;
        if (typeof addrs === 'string') {
          try { addrs = JSON.parse(addrs); } catch { addrs = []; }
        }
        return { ...row, addresses: addrs || [] };
      }
    } catch (err) {
      // Fallback to in-memory store
    }

    return this.inMemoryUsers.find((u) => u.id === id);
  }

  async create(user: Omit<StoredUser, 'id' | 'createdAt'>): Promise<StoredUser> {
    const newId = `usr-${Date.now()}`;
    const createdAt = new Date().toISOString().split('T')[0];
    const newUser: StoredUser = {
      ...user,
      id: newId,
      createdAt,
      addresses: user.addresses || [],
    };

    try {
      await query(
        'INSERT INTO users (id, name, email, phone, password_hash, role, created_at, addresses) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [newId, newUser.name, newUser.email, newUser.phone || null, newUser.passwordHash, newUser.role, createdAt, JSON.stringify(newUser.addresses)]
      );
    } catch (err) {
      // Fallback to in-memory store
      this.inMemoryUsers.push(newUser);
    }

    return newUser;
  }

  async updateAddresses(id: string, addresses: any[]): Promise<boolean> {
    try {
      await query('UPDATE users SET addresses = $1 WHERE id = $2', [JSON.stringify(addresses), id]);
      return true;
    } catch (err) {
      const userIdx = this.inMemoryUsers.findIndex((u) => u.id === id);
      if (userIdx > -1) {
        this.inMemoryUsers[userIdx].addresses = addresses;
      }
      return true;
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const res = await query('SELECT id, name, email, phone, role, created_at as "createdAt", addresses FROM users ORDER BY created_at DESC');
      if (res.rows.length > 0) {
        return res.rows.map((row) => {
          let addrs = row.addresses;
          if (typeof addrs === 'string') {
            try { addrs = JSON.parse(addrs); } catch { addrs = []; }
          }
          return { ...row, addresses: addrs || [] };
        });
      }
    } catch (err) {
      // Fallback
    }

    return this.inMemoryUsers.map(({ passwordHash, ...user }) => user);
  }
}

export const userRepository = new UserRepository();
