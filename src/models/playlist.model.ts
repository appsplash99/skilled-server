import { Schema, model } from 'mongoose';
import { IPlaylist, IPlaylistChildSchema } from '../interfaces/playlist.interface';

const playlistChildSchema = new Schema<IPlaylistChildSchema>({
  video: { type: Schema.Types.ObjectId, ref: 'Video' },
});

export const playlistSchema = new Schema<IPlaylist>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      trim: true,
      required: 'Playlist name is required',
    },
    videos: [playlistChildSchema],
  },
  { timestamps: true }
);

export const Playlist = model<IPlaylist>('Playlist', playlistSchema);
