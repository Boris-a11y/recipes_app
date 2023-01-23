import { Request, Response } from 'express';
import { Recipe } from 'src/entity/Recipe';
import { recipeRepository } from '../../repository/repository';
import { _Recipe } from './_Recipe';

export const Recipes = async (_: Request, res: Response) => {
  const recipes: Recipe[] = await recipeRepository.find();

  return res.status(200).send(recipes);
};
