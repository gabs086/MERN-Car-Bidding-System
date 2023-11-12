import { Response, Request } from 'express';

import cars from '../data/cars.json';
import carBrands from '../data/car-brands.json';

type CarFilterQuery = {
  brand?: string;
};

export const getAllCars = async (req: Request, res: Response) => {
  const { brand }: CarFilterQuery = req.query;
  const filtered = cars.filter((d: any) => {
    if (brand) {
      return d.title.toLowerCase().includes(brand.toLowerCase());
    }
    return d;
  });
  res.json(filtered);
};

export const getAllCarBrands = async (req: Request, res: Response) => {
  res.json(carBrands);
};
