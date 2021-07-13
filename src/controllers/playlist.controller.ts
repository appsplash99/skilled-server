import { IRequest, IResponse } from '../interfaces/express.interface';
import { Playlist } from '../models/playlist.model';
import { resJson } from '../utils/responseHelpers';

const defaultPlaylists: string[] = ['Liked Videos', 'Saved Videos', 'Watch Later'];

export const deleteVideoFromPlaylist = async (req: IRequest, res: IResponse): Promise<IResponse | void> => {
  const { playlist, video } = req;
  try {
    await playlist?.videos?.id(video?._id)?.remove();
    await playlist?.save();
    const userPlaylist = await Playlist.findById(playlist?._id);
    await userPlaylist?.populate('videos.video').execPopulate();
    return resJson(res, 200, true, `video successfully deleted from ${playlist?.name}`, 'no error', userPlaylist);
  } catch (error) {
    return resJson(
      res,
      500,
      false,
      `Unable to Delete video (videoId: ${video?._id}) from playlist: ${playlist?.name}`,
      error
    );
  }
};

export const deletePlaylist = async (req: IRequest, res: IResponse): Promise<IResponse | void> => {
  const { playlist } = req;
  try {
    await Playlist.deleteOne({ _id: playlist?._id });
    return resJson(res, 200, true, 'Successfully deleted Playlist', 'no error', playlist?._id);
  } catch (error) {
    return resJson(res, 500, false, `Unable to Delete playlist: ${playlist?.id}`, error);
  }
};

export const addVideoIntoPlaylist = async (req: IRequest, res: IResponse): Promise<IResponse | void> => {
  const { playlist, video } = req;
  try {
    /** Find the sub-document */
    if (playlist?.videos.id(video?._id)) {
      return resJson(res, 400, false, `Video is already present in the playlist: ${playlist?.name}`, 'no error');
    }
    playlist?.videos.push({ _id: video?._id, video: video?._id });
    await playlist?.save();
    await playlist?.populate('videos.video').execPopulate();
    return resJson(res, 200, true, 'Video Successfully added into Playlist', 'no error', playlist);
  } catch (error) {
    return resJson(res, 500, false, `Unable to add video (videoId: ${video?._id}) into ${playlist?.name}`, error);
  }
};

export const createPlaylist = async (req: IRequest, res: IResponse): Promise<IResponse | void> => {
  const { user, video } = req;
  const { name } = req.body;
  const newPlaylist = new Playlist({
    userId: user?._id,
    name,
    videos: [{ _id: video?._id, video: video?._id }],
  });
  try {
    let playlist = await newPlaylist.save();
    playlist = await playlist.populate('videos.video').execPopulate();
    return resJson(res, 201, true, 'Playlist Created Successfully', 'no error', playlist);
  } catch (error) {
    return resJson(res, 500, false, 'Playlist Could not be Created with playlist', error);
  }
};

export const getVideosFromPlaylist = async (req: IRequest, res: IResponse): Promise<IResponse | void> => {
  const { playlist } = req;
  try {
    const populatedPlaylist = await playlist?.populate('videos.video').execPopulate();
    return resJson(res, 200, true, 'Successfully Found Playlist', 'no error', populatedPlaylist);
  } catch (error) {
    return resJson(res, 500, false, `Unable to get Videos of the Playlist: ${playlist?.name}`, error);
  }
};

export const getAllPlaylists = async (req: IRequest, res: IResponse): Promise<IResponse | void> => {
  const { user } = req;
  try {
    const response = await Playlist.find({ userId: user?._id });

    if (!response.length) {
      /**  if response is empty -  Create Default playlists */
      const transformedData = defaultPlaylists.map(playlist => ({
        userId: user?._id,
        name: playlist,
        videos: [],
      }));
      try {
        const createdPlaylist = await Playlist.insertMany(transformedData);
        return resJson(res, 200, true, 'Default playlists created successfully', 'no error', createdPlaylist);
      } catch (error) {
        return resJson(res, 500, false, 'Default Playlist creation Unsuccessful', error);
      }
    } else {
      /** Populate N - number of user's playlists */
      const responsePromises = await response.map(eachPlaylist => eachPlaylist.populate('videos.video').execPopulate());
      const allPlaylists = await Promise.all(responsePromises);
      return resJson(res, 200, true, "Successfully Populated User's Playlist", 'no error', allPlaylists);
    }
  } catch (error) {
    return resJson(res, 500, false, "Unable to Get User's Playlist", error);
  }
};
