/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/**
 * DO NOT REMOVE THE DISABLED ESLINT RULES ABOVE
 */
import { resJson } from '../utils/responseHelpers';
import { IRequest, IResponse, INextFunction } from '../interfaces/express.interface';

const catchAllErrors = (error: any, req: IRequest, res: IResponse, next: INextFunction): void => {
  resJson(res, 500, false, 'errorHandler caught something', error);
};

export { catchAllErrors as errorHandler };
