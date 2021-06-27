import { Document, Types } from 'mongoose';

/** Setting sub-document type */
export interface IPlaylistChildSchema extends Types.Subdocument {
  video: string;
}

export interface IPlaylist extends Document {
  userId: string;
  name: string;
  videos: Types.DocumentArray<IPlaylistChildSchema>;
}
