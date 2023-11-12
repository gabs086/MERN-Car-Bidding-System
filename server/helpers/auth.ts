import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwtDecode } from 'jwt-decode';

import { errorMessageHelper } from './handlers';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      const response = errorMessageHelper({
        statusCode: 403,
        name: 'Forbidden',
        message: 'Token does not exist',
      });
      return res.status(response.statusCode).json(response);
    }

    const tokenFromBearer = authorizationHeader.split(' ')[1];

    const decoded = jwt.verify(tokenFromBearer, process.env.SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    const response = errorMessageHelper({
      statusCode: 401,
      name: 'UnAuthorized',
      message: 'Please authenticate to continue your session',
    });
    res.status(response.statusCode).send(response);
  }
};

export const decodeToken = (req: Request) => {
  const authorizationHeader = req.headers.authorization;
  const tokenFromBearer = authorizationHeader.split(' ')[1];
  const decoded: any = jwtDecode(tokenFromBearer);
  return decoded;
};
