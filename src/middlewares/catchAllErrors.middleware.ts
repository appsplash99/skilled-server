import consola from 'consola';
import { Response } from 'express';
import { IRequest } from '@src/interfaces/request.interface';

export const catchAllErrorHandler = (err: Error, req: IRequest, res: Response): void => {
  consola.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
};
