import { Request, Response } from 'express';
import { Recipe } from 'src/entity/Recipe';
import { recipeRepository } from '../../repository/repository';
import { _Recipe } from './_Recipe';

export const createRecipe = async (req: any, res: Response) => {
  const recipeData: _Recipe = req.body;

  const recipe: Recipe = await recipeRepository.save({
    ...recipeData,
    userId: req.userId,
  });

  return res.status(201).json(recipe);
};
