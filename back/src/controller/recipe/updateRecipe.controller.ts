import { MyUserRequest } from 'src/utils/MyUserRequest';
import { Response } from 'express';
import { Recipe } from 'src/entity/Recipe';
import { UpdateResult } from 'typeorm';
import { recipeRepository } from '../../repository/repository';
import { _Recipe } from './_Recipe';

export const updateRecipe = async (req: MyUserRequest, res: Response) => {
  const id: number = +req.params.id;
  const { title, description, ingredients }: _Recipe = req.body;

  const recipe: Recipe | null = await recipeRepository.findOne({
    where: { id },
  });

  if (!recipe) {
    return res.status(400).json({ message: `No recipes with id: ${id}!` });
  }

  if (recipe.ownerId !== req.userId) {
    return res
      .status(201)
      .json({ message: `Can't update someone elses recipe!` });
  }

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
