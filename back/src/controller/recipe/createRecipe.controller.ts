import { Response } from 'express';
import { MyUserRequest } from '../../utils/MyUserRequest';
import { Recipe } from 'src/entity/Recipe';
import { recipeRepository } from '../../repository/repository';
import { _Recipe } from './_Recipe';

export const createRecipe = async (req: MyUserRequest, res: Response) => {
  const recipeData: _Recipe = req.body;

  const recipe: Recipe = await recipeRepository.save({
    ...recipeData,
    owner: req.user,
    ownerId: req.userId,
  });

  return res.status(201).json(recipe);
};
