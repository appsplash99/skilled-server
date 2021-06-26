import consola from 'consola';
import { IRequest, IResponse } from '@src/interfaces/express.interface';
import { Video } from '@src/models/video.model';

export const getAllVideos = async (req: IRequest, res: IResponse): Promise<void> => {
  try {
    // TODO: might need to add pagination/sort and filter
    const videos = await Video.find();
    res.status(200).json({ success: true, message: 'Successfully fetched all Videos!', videos });
  } catch (error) {
    consola.error(new Error('Unable to get all Videos'), error);
    res.status(400).json({
      success: false,
      message: 'Unable to get all Videos',
      error,
    });
  }
};

export const getOneVideo = async (req: IRequest, res: IResponse): Promise<void> => {
  const { video } = req;
  try {
    res.status(200).json({ success: true, message: 'Successfully fetched all Videos!', video });
  } catch (error) {
    consola.error(new Error('Unable to get desired Video'), error);
    res.status(400).json({
      success: false,
      message: 'Unable to get desired Video',
      error,
    });
  }
};
