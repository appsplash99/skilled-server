import { Router } from 'express';
import { findVideoById, findPlaylistById } from '@src/middlewares/routerParam.middlewars';
import { getAllVideos, getOneVideo } from '@src/controllers/video.controller';

const router = Router();

router.param('videoId', findVideoById);
router.param('playlistId', findPlaylistById);

router.get('/', getAllVideos);
router.get('/:videoId', getOneVideo);

export { router as videoRoutes };
