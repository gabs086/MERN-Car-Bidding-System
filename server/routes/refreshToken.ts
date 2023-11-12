import express, { Request, Response } from 'express';

import { refreshToken } from '../controllers/refreshToken';
import { auth } from '../helpers/auth';

const router = express.Router();

router.post('/refreshToken', auth, async (req: Request, res: Response) => await refreshToken(req, res));

export default router;
