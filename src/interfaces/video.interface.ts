import { Document } from 'mongoose';

export interface IVideo extends Document {
  videoId: string;
  thumbnail: string;
  title: string;
  description: string;
  channelLogo: string;
  length: string;
  views: number;
  likes: number;
  /** TODO: might need to store child comment schema for userId and string */
  comments: string[];
  category: string[];
  date: string;
}
