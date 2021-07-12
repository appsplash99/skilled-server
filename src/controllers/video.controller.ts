/* eslint-disable  @typescript-eslint/no-explicit-any */
/**
 * DO NOT REMOVE THE DISABLED ESLINT RULES ABOVE
 */
import { Video } from '../models/video.model';
import { resJson } from '../utils/responseHelpers';
import { IRequest, IResponse } from '../interfaces/express.interface';

export const getAllVideos = async (req: IRequest, res: IResponse): Promise<void> => {
  try {
    /** TODO: might need to add pagination/sort and filter */
    const videos = await Video.find();
    resJson(res, 200, true, 'Successfully fetched all Videos!', 'no error', videos);
  } catch (error) {
    resJson(res, 500, false, 'Unable to get all Videos', error);
  }
};

export const getOneVideo = async (req: IRequest, res: IResponse): Promise<void> => {
  const { video } = req;
  try {
    resJson(res, 200, true, 'Successfully fetched desider Video!', 'no error', video);
  } catch (error) {
    resJson(res, 500, true, 'Unable to get desired Video', error);
  }
};
