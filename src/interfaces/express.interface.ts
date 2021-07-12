import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './user.interface';
import { IVideo } from './video.interface';
import { IPlaylist } from './playlist.interface';

export interface IRequest extends Request {
  userId?: string | JwtPayload;
  user?: IUser;
  video?: IVideo;
  playlist?: IPlaylist;
}

export interface IResponse extends Response {}

export interface INextFunction extends NextFunction {}
