/* eslint-disable  @typescript-eslint/no-explicit-any */
/**
 * DO NOT REMOVE THE DISABLED ESLINT RULES ABOVE
 */

import { Playlist } from '../models/playlist.model';
import { IUser } from '../interfaces/user.interface';
import { IPlaylist } from '../interfaces/playlist.interface';

interface IRegisteredUser {
  userId?: string;
  userPlaylists?: IPlaylist[];
}
const defaultPlaylists: string[] = ['Liked Videos', 'Saved Videos', 'Watch Later'];

export const initializeNewUser = async (user: IUser): Promise<IRegisteredUser> => {
  const registeredUser: IRegisteredUser = {};
  /** save user */
  const savedUser = await user.save();
  registeredUser.userId = savedUser._id;

  /** Create new Default Playlists Array for New User */
  const playlistsToBeInserted: any = defaultPlaylists.map(playlistName => {
    return { userId: savedUser._id, name: playlistName, videos: [] };
  });

  /** insert defaultPlaylists in user's Playlists collection at once */
  const userFreshPlaylists = await Playlist.insertMany(playlistsToBeInserted);
  registeredUser.userPlaylists = userFreshPlaylists;

  return registeredUser;
};
