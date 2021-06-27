/* eslint-disable  @typescript-eslint/no-explicit-any */
/**
 * DO NOT REMOVE THE DISABLED ESLINT RULES ABOVE
 */
// import mongoose from 'mongoose';
import { Video } from '@src/models/video.model';
import { resJson } from '@src/utils/responseHelpers';
import { IRequest, IResponse } from '@src/interfaces/express.interface';
/** */
// import { PSYCHOLOGY_VIDEOSDATA as psycho } from '@src/config/fakerDB/psychology.videos';
// import { TALKS_VIDEOSDATA as talks } from '@src/config/fakerDB/tedXTalks.videos';
// import { SELFHELP_VIDEOSDATA as selfHelp } from '@src/config/fakerDB/selfHelp.videos';
/** */

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

// /**
//  * TODO: RE<PVE CODE BELOW
//  * ===================================
//  * ADD DOCUMENTS INTO DATABASE AT ONCE
//  * ===================================
//  */
// export const populateMyVideosInDb = async (req: IRequest, res: IResponse): Promise<void> => {
//   try {
//     console.log({ req, message: 'ran populateMyVideosInDb' });
//     const combinedVideosArray = [...talks, ...psycho, ...selfHelp];
//     const combinedVideosArrayWithId = combinedVideosArray.map(videoObj => {
//       return { ...videoObj, _id: mongoose.Types.ObjectId() };
//     });
//     const databaseVideos = await Video.insertMany(combinedVideosArrayWithId);
//     resJson(res, 201, true, 'successfully ran populateMyVideosInDb', 'no error', databaseVideos);
//   } catch (error) {
//     resJson(res, 500, false, 'Unable to run populateMyVideosInDb', error);
//   }
// };
