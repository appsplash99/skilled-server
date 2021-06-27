/* eslint-disable  @typescript-eslint/no-explicit-any */

import consola from 'consola';
import { IResponse } from '@src/interfaces/express.interface';

export interface IJsonObj {
  success: boolean;
  message: string;
  error?: Error | 'no error';
  response?: any;
}

/**
 * @param res
 * @param statusCode
 * @param success
 * @param message
 * @param error
 * @param data
 */
export const resJson = (
  res: IResponse,
  statusCode: number,
  success: boolean,
  message: string,
  error?: Error | 'no error',
  data?: any
): IResponse => {
  const jsonObj: IJsonObj = { success, message, error: 'no error' };

  if (error !== 'no error') jsonObj.error = error;

  if (data) jsonObj.response = data;

  if (!success) {
    consola.error(new Error(message), error);
  } else {
    consola.success(message);
  }

  return res.status(statusCode).json(jsonObj);
};
