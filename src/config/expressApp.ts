import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { router as apiRoutes } from '@src/routes';
import { catchAllErrorHandler as errorHandler } from '@src/middlewares/catchAllErrors.middleware';
import { routeNotFoundHandler as routeNotFound } from '@src/middlewares/routeNotFound.middleware';

// initialize express app
export const app = express();

// middlewares
app.use(cors()); // enable CORS - Cross Origin Resource Sharing
app.use(bodyParser.json()); // parse body params and attache them to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// mount api v1 routes
app.use('/api/', apiRoutes);

// errorHandler
app.use(errorHandler);
// path not found handler
app.use(routeNotFound);
