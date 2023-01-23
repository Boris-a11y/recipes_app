import { Request, Response } from 'express';
import { userRepository } from '../../repository/repository';
import { compare } from 'bcryptjs';
import { _User } from './_User';
import { createAccessToken } from '../../utils/auth';
import { config } from '../../config/config';
import { User } from 'src/entity/User';

const { COOKIE_NAME } = config;

export const Login = async (req: Request, res: Response) => {
  const { username, password }: _User = req.body;

  const user: User | null = await userRepository.findOne({
    where: { username },
  });

  if (!user || !(await compare(password, user?.password as string))) {
    return res.status(400).send({ message: 'Invalid username or password!' });
  }

  return res
    .cookie(COOKIE_NAME, createAccessToken(user), {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    })
    .status(200)
    .send({ message: 'Logged in' });
};
