import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';

import { succesMessageHelper } from '../helpers/handlers';
import { decodeToken } from '../helpers/auth';

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const decoded: any = decodeToken(req);

    const obj = {
      id: decoded.id,
      email: decoded.email,
    };

    //* New BearerToken
    const bearerToken = jwt.sign(obj, process.env.SECRET_KEY, {
      expiresIn: '1d', //* 1 day
    });
    res.header('Authorization', `Bearer ${bearerToken}`);
    const response = succesMessageHelper(200, 'Token Refreshed');
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
