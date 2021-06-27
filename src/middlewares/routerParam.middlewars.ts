import consola from 'consola';
import { User } from '@src/models/user.model';
import { Video } from '@src/models/video.model';
import { Playlist } from '@src/models/playlist.model';
import { resJson } from '@src/utils/responseHelpers';
import { IRequest, IResponse, INextFunction } from '@src/interfaces/express.interface';

/**
 * User controller for router.param middleware
 */
export const findUserById = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      req.user = user;
      consola.success('User found by userId');
    } else {
      resJson(res, 404, false, `User Not Found with ${userId}`);
    }
    next();
  } catch (error) {
    resJson(res, 500, false, `Unable to find User with ${userId}`, error);
  }
};

/**
 * Video controller for router.param middleware
 */
export const findVideoById = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
  const { videoId } = req.params;
  try {
    const video = await Video.findById(videoId);
    if (video) {
      req.video = video;
      consola.success('Video found by videoId');
    } else {
      resJson(res, 404, false, `video Not Found with ${videoId}`);
    }
    next();
  } catch (error) {
    resJson(res, 500, false, `Unable to find video with ${videoId}`, error);
  }
};

/**
 * Playlist controller for router.param middleware
 */
export const findPlaylistById = async (req: IRequest, res: IResponse, next: INextFunction): Promise<void> => {
  const { playlistId } = req.params;
  try {
    const playlist = await Playlist.findById(playlistId);
    if (playlist) {
      req.playlist = playlist;
      consola.success('Playlist found by playlistId');
    } else {
      resJson(res, 404, false, `playlist Not Found with ${playlistId}`);
    }
    next();
  } catch (error) {
    resJson(res, 500, false, `Unable to find playlistId with ${playlistId}`, error);
  }
};
