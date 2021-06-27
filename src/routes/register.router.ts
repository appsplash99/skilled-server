import { Router } from 'express';
import { registerNewUser } from '@src/controllers/register.controller';

const router = Router();

router.post('/', registerNewUser);

export { router as registerRoutes };
