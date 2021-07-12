import consola from 'consola';
import { expressApp } from './config/expressApp';
import { port } from './config/constants';
import { connectToDb } from './config/database';

/** Connect to Mongoose */
connectToDb();

expressApp.listen(port || 3001, () => {
  consola.success(`Express Server running on port: ${port}`);
});
