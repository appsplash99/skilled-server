import express, { Request, Response } from 'express';
import { router as userRoutes } from '@src/routes/user.router';
import { router as videoRoutes } from '@src/routes/video.router';

// initialize router
export const router = express.Router();

/**
 * GET api/status
 */
router.get('/status', (req: Request, res: Response) => res.send('OK'));

// api routes
router.use('/user', userRoutes);
router.use('/videos', videoRoutes);
