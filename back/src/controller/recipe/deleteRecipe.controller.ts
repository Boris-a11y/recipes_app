import { Response } from 'express';
import { Recipe } from 'src/entity/Recipe';
import { recipeRepository } from '../../repository/repository';
import { MyUserRequest } from '../../utils/MyUserRequest';
import { _Recipe } from './_Recipe';

export const deleteRecipe = async (req: MyUserRequest, res: Response) => {
  const id = +req.params.id;

  const recipe: Recipe | null = await recipeRepository.findOne({
    where: { id },
  });

  if (!recipe) {
    return res.status(400).json({ message: `No recipes with id: ${id}!` });
  }

  if (recipe.ownerId !== req.userId) {
    return res
      .status(201)
      .json({ message: `Can't delete someone elses recipe!` });
  }

  await recipeRepository.delete({
    id,
  });

  return res.status(201).json({ message: `Deleted recipe with id: ${id}!` });
};
