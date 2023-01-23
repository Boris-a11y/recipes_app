import { Response } from 'express';

export const me = (req: any, res: Response) => {
  return res.json({ currentUser: { id: req.userId } });
};
