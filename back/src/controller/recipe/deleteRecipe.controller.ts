import { Request, Response } from 'express';
import { recipeRepository } from '../../repository/repository';
import { _Recipe } from './_Recipe';

export const deleteRecipe = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedRecipe = await recipeRepository.delete(id);

  return res.status(201).json(deletedRecipe);
};
