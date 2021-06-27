import { Router } from 'express';
import { loginUser } from '@src/controllers/login.controller';

const router = Router();

router.post('/', loginUser);

export { router as loginRoutes };
