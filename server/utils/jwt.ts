import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { config } from '../config/config';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateToken = (payload: JwtPayload): string => {
  const secret: Secret = config.jwtSecret;
  const options: SignOptions = { expiresIn: '24h' };
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const secret: Secret = config.jwtSecret;
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    return null;
  }
};
