  import { Router } from 'express';
import { videoRoutes } from './video.router';
import { playlistRoutes } from './playlist.router';
import { loginRoutes } from './login.router';
import { registerRoutes } from './register.router';
import { IRequest, IResponse } from '../interfaces/express.interface';
import { verifyToken } from '../middlewares/verifyToken.middleware';

// initialize router
const router = Router();

/** GET api/status */
router.get('/status', (req: IRequest, res: IResponse) => res.send('OK'));

// public api routes
router.use('/videos', videoRoutes);
router.use('/login', loginRoutes);
router.use('/register', registerRoutes);

/** * protected api routes */
router.use('/playlist', verifyToken, playlistRoutes);

export { router as apiRoutes };
