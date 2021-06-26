import { Schema, model } from 'mongoose';
import { IVideo } from '@src/interfaces/video.interface';

export const videoSchema = new Schema<IVideo>(
  {
    videoId: {
      type: String,
      trim: true,
      required: 'videoId is required',
    },
    thumbnail: {
      type: String,
      trim: true,
      required: 'thumbnail is required',
    },
    title: {
      type: String,
      trim: true,
      required: 'title is required',
    },
    description: {
      type: String,
      trim: true,
      required: 'description is required',
    },
    channelLogo: {
      type: String,
      required: 'channelLogo image is required',
    },
    comments: {
      type: [String],
    },
    length: {
      type: String,
    },
    views: {
      type: Number,
    },
    likes: {
      type: Number,
    },
    category: {
      type: [String],
    },
    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const VideoModel = model<IVideo>('Video', videoSchema);