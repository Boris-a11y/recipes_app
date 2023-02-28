import express, { Router } from 'express';
import { isAuth } from '@middleware/isAuth';
import { AuthController } from '@controller/auth/authController';

const authRouter: Router = express.Router();
const { prototype: authControler } = AuthController;

authRouter.post('/api/register', authControler.RegisterUser);
authRouter.post('/api/login', authControler.LoginUser);
authRouter.get('/api/me', isAuth, authControler.currentUser);
authRouter.get('/api/logout', isAuth, authControler.LogoutUser);

export { authRouter };
