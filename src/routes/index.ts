import { Router } from 'express';
// import { userRoutes } from '@src/routes/user.router';
import { videoRoutes } from '@src/routes/video.router';
import { playlistRoutes } from '@src/routes/playlist.router';
import { loginRoutes } from '@src/routes/login.router';
import { registerRoutes } from '@src/routes/register.router';
import { IRequest, IResponse } from '@src/interfaces/express.interface';

// initialize router
const router = Router();

/**
 * GET api/status
 */
router.get('/status', (req: IRequest, res: IResponse) => res.send('OK'));

// public api routes
router.use('/videos', videoRoutes);
router.use('/login', loginRoutes);
router.use('/register', registerRoutes);

/**
 * TODO: add verifyToken middleware in below
 * protected api routes
 */
// router.use('/user', userRoutes);
router.use('/playlist', playlistRoutes);

export { router as apiRoutes };
