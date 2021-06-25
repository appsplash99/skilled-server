import { Router, Request, Response } from 'express';
import { addNewUser } from '../controllers/user.controller';

export const router = Router();

router
  .get('/', (req: Request, res: Response) => {
    console.log('user found');
    res.status(200).send('User found!');
  })
  .post('/add-user', addNewUser);
