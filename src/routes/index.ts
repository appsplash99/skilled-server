import express, { Request, Response } from 'express';
// Routes
import { router as userRoutes } from './user.router';

// initialize router
export const router = express.Router();

/**
 * GET api/status
 */
router.get('/status', (req: Request, res: Response) => res.send('OK'));

// user routes
router.use('/user', userRoutes);
