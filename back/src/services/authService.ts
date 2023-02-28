import { Request, Response } from 'express';
import { userRepository } from '@repository/repository';
import { genSalt, hash, compare } from 'bcryptjs';
import { UserDTO } from '@model/UserDTO';
import { config } from '@config/config';
import { User } from '@entity/User';
import { ValidationRules } from '@validation-rules/registerValidation';
import { ApiResponseError } from '@model/ApiResponseError';
import HttpStatusCode from '@httpCodes/HttpCodes';

const { COOKIE_NAME } = config;
const { OK, BAD_REQUEST } = HttpStatusCode;
const { prototype: validationRules } = ValidationRules;

export class AuthService {
  Register = async (userData: UserDTO) => {
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
  Login = async (userData: any) => {
    const { username, password } = userData;
    const { error } = validationRules.loginSchema.validate(userData);

    const user: User | null = await userRepository.findOne({
      where: { username },
    });

    if (!user || !(await compare(password, user?.password as string))) {
      const err: ApiResponseError = {
        code: BAD_REQUEST,
        errorObj: error,
      };
      throw new Error(err.code.toString());
    }

    return { user, statusCode: 201 };
  };
  Logout = (_: Request, res: Response) => {
    return res
      .clearCookie(COOKIE_NAME)
      .status(OK)
      .send({ message: 'logged out' });
  };
}
