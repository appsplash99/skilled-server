import { Router } from 'express';
import { findVideoById, findPlaylistById } from '@src/middlewares/routerParam.middlewars';
import { getAllVideos, getOneVideo, populateMyVideosInDb } from '@src/controllers/video.controller';

const router = Router();

router.param('videoId', findVideoById);
router.param('playlistId', findPlaylistById);

router.get('/', getAllVideos);
router.get('/:videoId', getOneVideo);

router.post('/post-videos', populateMyVideosInDb);

export { router as videoRoutes };
