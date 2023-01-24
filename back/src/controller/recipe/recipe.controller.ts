import { Request, Response } from 'express';
import { recipeRepository } from '../../repository/repository';
import { _Recipe } from './_Recipe';

export const getRecipe = async (req: Request, res: Response) => {
  const id = req.params.id as any;

  const recipe = await recipeRepository.findOne({
    where: { id },
  });
  return res.status(200).send(recipe);
};
