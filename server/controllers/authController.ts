import { Request, Response } from 'express';
import { authService } from '../services/authService';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, phone } = req.body;
      const result = await authService.register(name, email, password, phone);

      // ✅ Set JWT cookie on registration too
      res.cookie('mk_token', result.token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
      });

      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || 'Registration failed' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);

      // ✅ Set JWT as an httpOnly cookie (invisible to JS, safe from XSS)
      res.cookie('mk_token', result.token, {
        httpOnly: true,
        secure: false,         // set true in production (HTTPS)
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours in ms
        path: '/',
      });

      return res.status(200).json(result); // token also in body for Postman / localStorage fallback
    } catch (error: any) {
      return res.status(401).json({ message: error.message || 'Invalid login credentials' });
    }
  }

  async getMe(req: Request & { user?: any }, res: Response) {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }
      const user = await authService.getCurrentUser(req.user.userId);
      return res.status(200).json({ user });
    } catch (error: any) {
      return res.status(404).json({ message: error.message || 'User not found' });
    }
  }

  async recoverPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const message = await authService.recoverPassword(email);
      return res.status(200).json({ success: true, message });
    } catch (error: any) {
      return res.status(400).json({ message: error.message || 'Failed to dispatch recovery link' });
    }
  }

  async addAddress(req: Request, res: Response) {
    try {
      const { userId, address } = req.body;
      if (!userId || !address) {
        return res.status(400).json({ message: 'userId and address are required' });
      }
      const updatedUser = await authService.addAddress(userId, address);
      return res.status(200).json({ user: updatedUser });
    } catch (error: any) {
      return res.status(400).json({ message: error.message || 'Failed to save address' });
    }
  }
  async logout(req: Request, res: Response) {
    // ✅ Clear the httpOnly cookie on logout
    res.clearCookie('mk_token', { path: '/' });
    return res.status(200).json({ message: 'Logged out successfully' });
  }
}

export const authController = new AuthController();
