import { Recipe } from '@entity/Recipe';
import { User } from '@entity/User';
import { Repository } from 'typeorm';
import { AppDataSource } from 'data-source';

export const userRepository: Repository<User> =
  AppDataSource.getRepository(User);

export const recipeRepository: Repository<Recipe> =
  AppDataSource.getRepository(Recipe);
