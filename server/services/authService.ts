import { userRepository } from '../data/userRepository';
import { comparePassword, hashPassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { User } from '../../src/types';

export interface AuthResponse {
  user: User;
  token: string;
}

export class AuthService {
  async register(name: string, email: string, password: string, phone?: string): Promise<AuthResponse> {
    if (!name || !name.trim()) {
      throw new Error('Name is required');
    }
    if (!email || !email.includes('@')) {
      throw new Error('Valid email address is required');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('An account with this email already exists');
    }

    const passwordHash = await hashPassword(password);
    const createdUser = await userRepository.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      role: 'CUSTOMER',
      addresses: [],
      passwordHash,
    });

    const { passwordHash: _, ...userDto } = createdUser;
    const token = generateToken({
      userId: userDto.id,
      email: userDto.email,
      role: userDto.role,
    });

    return { user: userDto, token };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const storedUser = await userRepository.findByEmail(email);
    if (!storedUser) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await comparePassword(password, storedUser.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const { passwordHash: _, ...userDto } = storedUser;
    const token = generateToken({
      userId: userDto.id,
      email: userDto.email,
      role: userDto.role,
    });

    return { user: userDto, token };
  }

  async getCurrentUser(userId: string): Promise<User> {
    const storedUser = await userRepository.findById(userId);
    if (!storedUser) {
      throw new Error('User not found');
    }

    const { passwordHash: _, ...userDto } = storedUser;
    return userDto;
  }

  async recoverPassword(email: string): Promise<string> {
    if (!email || !email.includes('@')) {
      throw new Error('Please provide a valid email address');
    }
    // Simulate password recovery email dispatch
    return `Password recovery instructions have been sent to ${email}.`;
  }

  async addAddress(userId: string, address: any): Promise<User> {
    const storedUser = await userRepository.findById(userId);
    if (!storedUser) {
      throw new Error('User not found');
    }
    const updatedAddresses = [...(storedUser.addresses || []), address];
    await userRepository.updateAddresses(userId, updatedAddresses);
    storedUser.addresses = updatedAddresses;
    const { passwordHash: _, ...userDto } = storedUser;
    return userDto;
  }
}

export const authService = new AuthService();
