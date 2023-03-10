import { verify } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { config } from '@config/config';
import { MyUserRequest } from '@utils/MyUserRequest';

const { COOKIE_NAME, JWT_SECRET } = config;

export const isAuth = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const token: string = req.cookies[COOKIE_NAME];

  if (!token) {
    return res.status(401).send({ message: 'Not Authenticated' });
  }

  const payload: any = verify(token, JWT_SECRET);
  req.userId = payload.id;
  req.user = payload.user;

  return next();
};
