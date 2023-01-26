import { Response } from 'express';
import { MyUserRequest } from 'src/utils/MyUserRequest';

export const me = (req: MyUserRequest, res: Response) => {
  return res.json({
    currentUser: { id: req.userId, user: req.user },
  });
};
