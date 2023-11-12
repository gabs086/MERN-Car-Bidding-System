import express, { Request, Response } from 'express';

import { getAllCars, getAllCarBrands } from '../controllers/cars';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => await getAllCars(req, res));
router.get('/brands', async (req: Request, res: Response) => await getAllCarBrands(req, res));

export default router;
