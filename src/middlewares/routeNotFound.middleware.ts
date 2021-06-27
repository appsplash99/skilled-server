import consola from 'consola';
import { IRequest, IResponse } from '@src/interfaces/express.interface';
import { resJson } from '@src/utils/responseHelpers';

export const routeNotFoundHandler = (req: IRequest, res: IResponse): void => {
  consola.error('routeNotFoundHandler caught something!');
  resJson(res, 404, false, 'Url Route Not Present!');
};

export { routeNotFoundHandler as routeNotFound };
