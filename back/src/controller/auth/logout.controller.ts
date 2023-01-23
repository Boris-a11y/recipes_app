import { Request, Response } from 'express';
import { config } from '../../config/config';

const { COOKIE_NAME } = config;

export const Logout = (_: Request, res: Response) => {
  return res
    .clearCookie(COOKIE_NAME)
    .status(200)
    .send({ message: 'logged out' });
};
