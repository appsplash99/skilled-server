import consola from 'consola';
import { IRequest, IResponse, INextFunction } from '@src/interfaces/express.interface';
import { User } from '@src/models/user.model';
import { Video } from '@src/models/video.model';
import { Playlist } from '@src/models/playlist.model';

/**
 * User controller for router.param middleware
 */
export const findUserById = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
  const userId = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      req.user = user;
    } else {
      res.status(400).send({ success: false, message: `User Not Present with ${userId}` });
    }
    consola.success('User found by userId');
    next();
  } catch (err) {
    consola.error(new Error('Unable to find User by userId'), err);
    res.status(400).json({
      success: false,
      message: 'Unable to retrive the User by userId',
      error: err,
    });
  }
};

/**
 * Video controller for router.param middleware
 */
export const findVideoById = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
  const videoId = req.params;
  try {
    const video = await Video.findById(videoId);
    if (video) {
      req.video = video;
    } else {
      res.status(400).send({ success: false, message: `video Not Present with ${videoId}` });
    }
    next();
  } catch (error) {
    consola.error(new Error('Unable to find Video by videoId'), error);
    res.status(400).json({
      success: false,
      message: 'Unable to find Video by videoId',
      error,
    });
  }
};

/**
 * Playlist controller for router.param middleware
 */
export const findPlaylistById = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
  const playlistId = req.params;
  try {
    const playlist = await Playlist.findById(playlistId);
    if (playlist) {
      req.playlist = playlist;
    } else {
      res.status(400).send({ success: false, message: `playlist Not Present with ${playlistId}` });
    }
    next();
  } catch (error) {
    consola.error(new Error('Unable to find Playlist by playlistId'), error);
    res.status(400).json({
      success: false,
      message: 'Unable to find Playlist by playlistId',
      error,
    });
  }
};
