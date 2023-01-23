import { Request, Response } from 'express';
import { Recipe } from 'src/entity/Recipe';
import { recipeRepository } from '../../repository/repository';
import { _Recipe } from './_Recipe';

export const createRecipe = async (req: Request, res: Response) => {
  const { title, description, ingredients }: _Recipe = req.body;

  const recipe: Recipe = await recipeRepository.save({
    title,
    description,
    ingredients,
  });

  return res.status(201).json(recipe);
};
