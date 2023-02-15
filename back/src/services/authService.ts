import { NextFunction, Request, Response } from 'express';
import { userRepository } from '../repository/repository';
import { genSalt, hash, compare } from 'bcryptjs';
import { _User } from '../model/_User';
import { createAccessToken } from '../utils/auth';
import { config } from '../config/config';
import { User } from 'src/entity/User';
import { MyUserRequest } from 'src/utils/MyUserRequest';
import {
  registerSchema,
  loginSchema,
} from '../validation-rules/registerValidation';
import { logger } from '../logging-file/logger';
import { _ApiResponseError } from 'src/model/_ApiResponseError';
import HttpStatusCode from '../utils/HttpCodes';

const { COOKIE_NAME } = config;
const { OK, BAD_REQUEST } = HttpStatusCode;

// export const Register = async ( //ORIGINAL
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const { username, password, age, id }: _User = req.body;
//   const { error } = registerSchema.validate(req.body);

//   if (error) {
//     const err: _ApiResponseError = {
//       code: BAD_REQUEST,
//       errorObj: error,
//     };
//     next(err);
//   } else {
//     const salt: string = await genSalt(12);
//     const hashedPassword: string = await hash(password, salt);

//     const user: User = await userRepository.save({
//       username,
//       password: hashedPassword,
//       age,
//       id,
//     });
//     res.json(user);
//   }
// };

export const Register = async (userData: _User) => {
  const { username, password, age, id } = userData;

  const salt: string = await genSalt(12);
  const hashedPassword: string = await hash(password, salt);

  const user: User = await userRepository.save({
    username,
    password: hashedPassword,
    age,
    id,
  });
  return { user, statusCode: 201 };
};

// export const Login = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const { username, password }: _User = req.body;
//   const { error } = loginSchema.validate(req.body);

//   if (error) {
//     const err: _ApiResponseError = {
//       code: BAD_REQUEST,
//       errorObj: error,
//     };
//     next(err);
//   } else {
//     const user: User | null = await userRepository.findOne({
//       where: { username },
//     });

//     if (!user || !(await compare(password, user?.password as string))) {
//       return res
//         .status(BAD_REQUEST)
//         .json({ message: 'Invalid username or password!' });
//     }

//     return res
//       .cookie(COOKIE_NAME, createAccessToken(user), {
//         httpOnly: true,
//         secure: false,
//         maxAge: 24 * 60 * 60 * 1000,
//         sameSite: 'lax',
//       })
//       .status(OK)
//       .json(user);
//   }
//   return;
// };

export const Login = async (userData: any) => {
  const { username, password } = userData;
  const { error } = loginSchema.validate(userData);

  const user: User | null = await userRepository.findOne({
    where: { username },
  });

  if (!user || !(await compare(password, user?.password as string))) {
    const err: _ApiResponseError = {
      code: BAD_REQUEST,
      errorObj: error,
    };
    throw new Error(err.code.toString());
  }

  return { user, statusCode: 201 };
  // return err;
  // return res
  //   .status(BAD_REQUEST)
  //   .json({ message: 'Invalid username or password!' });

  // return res
  //   .cookie(COOKIE_NAME, createAccessToken(user), {
  //     httpOnly: true,
  //     secure: false,
  //     maxAge: 24 * 60 * 60 * 1000,
  //     sameSite: 'lax',
  //   })
  //   .status(OK)
  //   .json(user);
};

export const Logout = (_: Request, res: Response) => {
  return res
    .clearCookie(COOKIE_NAME)
    .status(OK)
    .send({ message: 'logged out' });
};

// export const currentUser = (req: MyUserRequest, res: Response) => {
//   return res.json({
//     currentUser: { id: req.userId, user: req.user },
//   });
// };
