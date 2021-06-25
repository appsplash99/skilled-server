import { connect } from 'mongoose';
import { mongoTestDbUri } from './constants';

export const connectToDb = async (): Promise<void> => {
  try {
    await connect(mongoTestDbUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log('MongoDB connected sucessfully');
  } catch (error) {
    console.log('MongoDB connection has failed..', error);
  }
};
