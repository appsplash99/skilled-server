import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { router as apiRoutes } from '../routes';

// initialize express app
export const app = express();

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mount api v1 routes
app.use('/api/', apiRoutes);
