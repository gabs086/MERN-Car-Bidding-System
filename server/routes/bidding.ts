import express, { Request, Response } from 'express';

import { auth } from '../helpers/auth';
import { createAuction, getAllBids } from '../controllers/bidding';

const router = express.Router();

router.post('/createAuction', auth, async (req: Request, res: Response) => await createAuction(req, res));
router.get('/', auth, async (req: Request, res: Response) => await getAllBids(req, res));

export default router;
