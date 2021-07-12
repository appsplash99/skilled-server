import { Router } from 'express';
import { findVideoById, findPlaylistById } from '../middlewares/routerParam.middlewars';
import {
  deleteVideoFromPlaylist,
  deletePlaylist,
  addVideoIntoPlaylist,
  createPlaylist,
  getVideosFromPlaylist,
  getAllPlaylists,
} from '../controllers/playlist.controller';

const router = Router();

/** Router Middlewares */
router.param('videoId', findVideoById);
router.param('playlistId', findPlaylistById);

/** Routes */
router.get('/', getAllPlaylists);
router.get('/:playlistId', getVideosFromPlaylist);

router.post('/:playlistId', createPlaylist);
router.post('/:playlistId/:videoId', addVideoIntoPlaylist);

router.delete('/:playlistId', deletePlaylist);
router.delete('/:playlistId/:videoId', deleteVideoFromPlaylist);

export { router as playlistRoutes };
