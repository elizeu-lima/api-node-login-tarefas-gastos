import { Router } from 'express';
import * as auth from '../controllers/authController.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.post('/register', auth.register);
router.post('/login', auth.login);
router.put('/reset', authMiddleware, auth.resetPassword);

export default router;
