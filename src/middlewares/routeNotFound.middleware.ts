import { IRequest, IResponse } from '@src/interfaces/express.interface';

export const routeNotFoundHandler = (req: IRequest, res: IResponse): void => {
  res.status(404).json({
    success: false,
    message: 'Url Route Not Present!',
  });
};
