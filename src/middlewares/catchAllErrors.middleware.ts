import consola from 'consola';
import { IRequest, IResponse } from '@src/interfaces/express.interface';

export const catchAllErrorHandler = (err: Error, req: IRequest, res: IResponse): void => {
  consola.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
};
