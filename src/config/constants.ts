import dotenv from 'dotenv';

dotenv.config();

export const env = process.env.NODE_ENV;
export const port = process.env.PORT;
export const mongoVideoLibDbUri = process.env.MONGO_VIDEO_LIB_DB_URI as string;
