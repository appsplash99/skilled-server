import { Router } from 'express';
import { findVideoById } from '@src/middlewares/routerParam.middlewars';
import { getAllVideos, getOneVideo } from '@src/controllers/video.controller';

export const router = Router();

router.param('videoId', findVideoById);

router.get('/', getAllVideos);
router.get('/:videoId', getOneVideo);
