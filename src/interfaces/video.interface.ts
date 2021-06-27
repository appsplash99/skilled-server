import { Document } from 'mongoose';

/** TODO: might need to store child comment schema for userId and string */
export interface IVideo extends Document {
  videoId: string;
  thumbnail: string;
  title: string;
  description: string;
  channelName: string;
  channelLogo: string;
  length: string;
  views: number;
  likes: number;
  comments: string[];
  category: string[];
  date: string;
}
