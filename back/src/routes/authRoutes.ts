import { isAuth } from '@middleware/isAuth';
import express from 'express';
import { AuthController } from '@controller/auth/authController';

const authRouter = express.Router();
const { prototype: authControler } = AuthController;

authRouter.post('/api/register', authControler.RegisterUser);
authRouter.post('/api/login', authControler.LoginUser);
authRouter.get('/api/me', isAuth, authControler._currentUser);
authRouter.get('/api/logout', isAuth, authControler.LogoutUser);

export { authRouter };
