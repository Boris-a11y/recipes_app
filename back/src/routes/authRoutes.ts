import { Register } from '../controller/auth/register.controller';
import { Login } from '../controller/auth/login.controller';
import { Logout } from '../controller/auth/logout.controller';
import { isAuth } from '../middleware/isAuth';
import { me } from '../controller/auth/me.controller';
import express from 'express';

const authRouter = express.Router();

//AUTH

authRouter.post('/api/register', Register);
authRouter.post('/api/login', Login);
authRouter.get('/api/me', isAuth, me);
authRouter.get('/api/logout', isAuth, Logout);

export { authRouter };
