import { Request } from 'express';

export interface MyUserRequest extends Request {
  userId?: number;
  user?: any;
}
