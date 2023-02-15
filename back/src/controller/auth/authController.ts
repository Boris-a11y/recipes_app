import { NextFunction, Request, response, Response } from 'express';
import { userRepository } from '../../repository/repository';
import bcrypt from 'bcryptjs';
import { _User } from '../../model/_User';
import { User } from 'src/entity/User';
import { Register, Login, Logout } from '../../services/authService';
import { MyUserRequest } from '../../utils/MyUserRequest';
import {
  loginSchema,
  registerSchema,
} from '../../validation-rules/registerValidation';
import { _ApiResponseError } from 'src/model/_ApiResponseError';
import HttpStatusCode from '../../utils/HttpCodes';
import { config } from '../../config/config';
import { createAccessToken } from '../../utils/auth';

const { COOKIE_NAME } = config;
const { BAD_REQUEST, OK } = HttpStatusCode;

export const RegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { username, password, age, id }: _User = req.body;
  const { error } = registerSchema.validate(req.body);
  if (error) {
    const err: _ApiResponseError = {
      code: BAD_REQUEST,
      errorObj: error,
    };
    next(err);
  } else {
    const { user, statusCode } = await Register({
      username,
      password,
      age,
      id,
    });

    res.json({ user, statusCode });
  }
};

export const LoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { username, password }: _User = req.body;
  const { error } = loginSchema.validate(req.body);

  if (error) {
    const err: _ApiResponseError = {
      code: BAD_REQUEST,
      errorObj: error,
    };
    next(err);
  } else {
    const { user, statusCode } = await Login({ username, password });
    res
      .cookie(COOKIE_NAME, createAccessToken(user), {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax',
      })
      .status(OK)
      .json({ user, statusCode });
  }
};

export const LogoutUser = async (_: Request, res: Response) => {
  return res
    .clearCookie(COOKIE_NAME)
    .status(OK)
    .send({ message: 'logged out' });
};

export const _currentUser = async (req: MyUserRequest, res: Response) => {
  return res.json({ currentUser: { id: req.userId, user: req.user } });
};
