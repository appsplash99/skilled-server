import { Request } from 'express';
import { IUser } from './user.interface';

export interface IRequest extends Request {
  user?: IUser;
}
