import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { apiRoutes } from '@src/routes';
import { errorHandler } from '@src/middlewares/catchAllErrors.middleware';
import { routeNotFound } from '@src/middlewares/routeNotFound.middleware';
import { IRequest, IResponse } from '@src/interfaces/express.interface';

// initialize express app
const app = express();

// middlewares
app.use(cors()); // enable CORS - Cross Origin Resource Sharing
app.use(bodyParser.json()); // parse body params and attache them to req.body
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: IRequest, res: IResponse) => {
  res.send('Express Typescript Server for Skilled Video Library Client-React ');
});

// mount api v1 routes
app.use('/api/', apiRoutes);

// path not found handler
app.use(routeNotFound);

// errorHandler
app.use(errorHandler);

export { app as expressApp };
