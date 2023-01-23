import { User } from '../entity/User';
import { sign } from 'jsonwebtoken';
import { config } from '../config/config';

const { JWT_SECRET, JWT_EXPIRES_IN } = config;

export const createAccessToken = (user: User): string => {
  return sign({ id: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    algorithm: 'HS256',
  });
};
