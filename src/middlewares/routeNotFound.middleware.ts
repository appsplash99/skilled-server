import { Response } from 'express';
import { IRequest } from '@src/interfaces/request.interface';

export const routeNotFoundHandler = (req: IRequest, res: Response): void => {
  res.status(404).json({
    success: false,
    message: 'Url Route Not Present!',
  });
};
