import { Recipe } from '../entity/Recipe';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export const userRepository: Repository<User> =
  AppDataSource.getRepository(User);

export const recipeRepository: Repository<Recipe> =
  AppDataSource.getRepository(Recipe);
