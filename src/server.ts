import consola from 'consola';
import { expressApp } from '@src/config/expressApp';
import { port } from '@src/config/constants';
import { connectToDb } from '@src/config/database';

/** Connect to Mongoose */
connectToDb();

expressApp.listen(port || 3001, () => {
  consola.success(`Express Server running on port: ${port}`);
});
