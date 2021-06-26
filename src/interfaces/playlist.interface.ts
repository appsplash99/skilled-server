import { Document } from 'mongoose';

export interface IPlaylistChildSchema extends Document {
  video: string;
}

export interface IPlaylist extends Document {
  userId: string;
  name: string;
  videos: IPlaylistChildSchema[];
}
