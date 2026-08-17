import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.register(req, res));
router.post('/logout', (req, res) => authController.logout(req, res)); // ✅ clears cookie
router.post('/recover', (req, res) => authController.recoverPassword(req, res));
router.post('/address', (req, res) => authController.addAddress(req, res));
router.get('/me', authenticateToken, (req, res) => authController.getMe(req, res));

export default router;
