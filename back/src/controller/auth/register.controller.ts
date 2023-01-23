import { Request, Response } from 'express';
import { userRepository } from '../../repository/repository';
import bcrypt from 'bcryptjs';
import { _User } from './_User';
import { User } from 'src/entity/User';

export const Register = async (req: Request, res: Response): Promise<void> => {
  const { username, password, age }: _User = req.body;

  const salt: string = await bcrypt.genSalt(12);
  const hashedPassword: string = await bcrypt.hash(password, salt);

  const user: User = await userRepository.save({
    username,
    password: hashedPassword,
    age,
  });

  res.status(201).send(user);
};
