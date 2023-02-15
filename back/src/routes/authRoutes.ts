import { Register } from '../controller/auth/register.controller';
import { Login } from '../controller/auth/login.controller';
import { Logout } from '../controller/auth/logout.controller';
import { isAuth } from '../middleware/isAuth';
import { me } from '../controller/auth/me.controller';
import express from 'express';
import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  _currentUser,
} from '../controller/auth/authController';

const authRouter = express.Router();

authRouter.post('/api/register', RegisterUser);
authRouter.post('/api/login', LoginUser);
authRouter.get('/api/me', isAuth, _currentUser);
authRouter.get('/api/logout', isAuth, LogoutUser);

export { authRouter };
