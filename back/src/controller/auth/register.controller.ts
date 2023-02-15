import { Request, Response } from 'express';
import { userRepository } from '../../repository/repository';
import bcrypt from 'bcryptjs';
import { _User } from '../../model/_User';
import { User } from 'src/entity/User';

export const Register = async (req: Request, res: Response): Promise<void> => {
  const { username, password, age, id }: _User = req.body;

  const salt: string = await bcrypt.genSalt(12);
  const hashedPassword: string = await bcrypt.hash(password, salt);

  //Do validation here

  const user: User = await userRepository.save({
    username,
    password: hashedPassword,
    age,
    id,
  });

  res.status(201).send(user);
};
