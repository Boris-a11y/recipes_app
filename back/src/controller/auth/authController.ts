import { Request, Response, NextFunction } from 'express';
import { UserDTO } from '@model/UserDTO';
import { AuthService } from '@services/authService';
import { MyUserRequest } from '@utils/MyUserRequest';
import { ApiResponseError } from '@model/ApiResponseError';
import HttpStatusCode from '@httpCodes/HttpCodes';
import { config } from '@config/config';
import { createAccessToken } from '@utils/auth';
import { ValidationRules } from '@validation-rules/registerValidation';

const { COOKIE_NAME } = config;
const { BAD_REQUEST, OK } = HttpStatusCode;

const { prototype: validation } = ValidationRules;
const { prototype: authService } = AuthService;

export class AuthController {
  RegisterUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { username, password, age, id }: UserDTO = req.body;
    const { error } = validation.registerSchema.validate(req.body);
    if (error) {
      const err: ApiResponseError = {
        code: BAD_REQUEST,
        errorObj: error,
      };
      next(err);
    } else {
      const { user, statusCode } = await authService.Register({
        username,
        password,
        age,
        id,
      });

      res.json({ user, statusCode });
    }
  };

  LoginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { username, password }: UserDTO = req.body;
    const { error } = validation.loginSchema.validate(req.body);

    if (error) {
      const err: ApiResponseError = {
        code: BAD_REQUEST,
        errorObj: error,
      };
      next(err);
    } else {
      const { user, statusCode } = await authService.Login({
        username,
        password,
      });
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

  LogoutUser = async (_: Request, res: Response) => {
    return res
      .clearCookie(COOKIE_NAME)
      .status(OK)
      .send({ message: 'logged out' });
  };

  _currentUser = async (req: MyUserRequest, res: Response) => {
    return res.json({ currentUser: { id: req.userId, user: req.user } });
  };
}
