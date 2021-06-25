import dotenv from 'dotenv';

dotenv.config();

export const env = process.env.NODE_ENV;
export const port = process.env.PORT;
export const mongoTestDbUri = process.env.MONGO_TEST_DB_URI as string;
