import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';
import { recipeRepository } from '../../repository/repository';
import { _Recipe } from './_Recipe';

export const updateRecipe = async (req: Request, res: Response) => {
  const { title, description, ingredients, id }: _Recipe = req.body;

  const updated: UpdateResult = await recipeRepository.update(
    { id },
    {
      title,
      description,
      ingredients,
    },
  );

  return res.status(201).json(updated);
};
