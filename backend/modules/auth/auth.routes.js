// backend/modules/auth/auth.routes.js
import express from 'express';
import { authRateLimiter } from '../../middleware/rateLimit.middleware.js';
import authenticate from '../../middleware/auth.middleware.js';
import {register,login,refresh,logout,logoutAll} from './auth.controller.js';

const router = express.Router();

router.post('/register',authRateLimiter,register);
router.post('/login',authRateLimiter,login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/logout-all", authenticate, logoutAll);
export default router;