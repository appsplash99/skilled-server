import { IRequest, IResponse } from '@src/interfaces/express.interface';
import { Playlist } from '@src/models/playlist.model';
import { resJson } from '@src/utils/responseHelpers';

export const deleteVideoFromPlaylist = async (req: IRequest, res: IResponse): Promise<void> => {
  const { playlist, video } = req;
  try {
    await playlist?.videos?.id(video?._id)?.remove();
    await playlist?.save();
    const userPlaylist = await Playlist.findById(playlist?._id);
    await userPlaylist?.populate('videos.video').execPopulate();
    resJson(res, 200, true, `video successfully deleted from ${playlist?.name}`, 'no error', userPlaylist);
  } catch (error) {
    resJson(res, 500, false, `Unable to Delete video (videoId: ${video?._id}) from playlist: ${playlist?.name}`, error);
  }
};

export const deletePlaylist = async (req: IRequest, res: IResponse): Promise<void> => {
  const { playlist } = req;
  try {
    await Playlist.deleteOne({ _id: playlist?._id });
    resJson(res, 200, true, 'Successfully deleted Playlist', 'no error', playlist?._id);
  } catch (error) {
    resJson(res, 500, false, `Unable to Delete playlist: ${playlist?.id}`, error);
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
    resJson(res, 200, true, 'Video Successfully added into Playlist', 'no error', playlist);
  } catch (error) {
    resJson(res, 500, false, `Unable to add video (videoId: ${video?._id}) into ${playlist?.name}`, error);
  }
};

export const createPlaylist = async (req: IRequest, res: IResponse): Promise<void> => {
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
    resJson(res, 201, true, 'Playlist Created Successfully', 'no error', playlist);
  } catch (error) {
    resJson(res, 500, false, 'Playlist Could not be Created with playlist', error);
  }
};

export const getVideosFromPlaylist = async (req: IRequest, res: IResponse): Promise<void> => {
  const { playlist } = req;
  try {
    const populatedPlaylist = await playlist?.populate('videos.video').execPopulate();
    resJson(res, 200, true, 'Successfully Found Playlist', 'no error', populatedPlaylist);
  } catch (error) {
    resJson(res, 500, false, `Unable to get Videos of the Playlist: ${playlist?.name}`, error);
  }
};

export const getAllPlaylists = async (req: IRequest, res: IResponse): Promise<void> => {
  const { user } = req;
  try {
    const userPlaylists = await Playlist.find({ userId: user?._id });
    /** Populate N - number of user's playlists */
    const populatedUserPlaylists = await userPlaylists.map(eachPlaylist =>
      eachPlaylist.populate('videos.video').execPopulate()
    );
    resJson(res, 200, true, "Successfully Populated User's Playlist", 'no error', populatedUserPlaylists);
  } catch (error) {
    resJson(res, 500, false, "Unable to Populate User's Playlist", error);
  }
};
