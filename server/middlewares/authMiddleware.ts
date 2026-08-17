import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // ✅ Read token from httpOnly cookie first, then fall back to Authorization header (for Postman)
  const cookieToken = req.cookies?.mk_token;
  const authHeader = req.headers['authorization'];
  const headerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
  const token = cookieToken || headerToken;

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  req.user = payload;
  next();
};

export const requireRole = (role: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: `Access denied. ${role} role required.` });
    }
    next();
  };
};

export const requireAdmin = requireRole('ADMIN');
