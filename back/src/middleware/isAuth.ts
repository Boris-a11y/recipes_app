import jwt, { verify } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { config } from '../config/config';

const { COOKIE_NAME, JWT_SECRET } = config;

export const isAuth = async (req: any, res: Response, next: NextFunction) => {
  const token: string = req.cookies[COOKIE_NAME];
  console.log(req.cookies);

  if (!token) {
    return res.status(401).send({ message: 'Not Authenticated' });
  }

  const payload: any = verify(token, JWT_SECRET);
  req.userId = payload.id;

  return next();
};
