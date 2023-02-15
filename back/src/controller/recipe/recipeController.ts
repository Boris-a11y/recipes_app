import { Request, Response } from 'express';
import { _Recipe } from '../../model/_Recipe';
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  Recipes,
  updateRecipe,
} from '../../services/recipeService';
import { MyUserRequest } from 'src/utils/MyUserRequest';

export const _Recipes = async (_: Request, res: Response) => {
  const { recipes, statusCode } = await Recipes();

  return res.status(statusCode).send(recipes);
};

export const _getRecipe = async (req: Request, res: Response) => {
  const id = +req.params.id;
  const { recipe, statusCode } = await getRecipe(id);

  return res.status(statusCode).send(recipe);
};

export const _createRecipe = async (req: MyUserRequest, res: Response) => {
  const recipeData: _Recipe = req.body;
  const { recipe, statusCode } = await createRecipe(
    recipeData,
    req.user,
    req.userId,
  );

  return res.status(statusCode).send(recipe);
};

export const _deleteRecipe = async (req: MyUserRequest, res: Response) => {
  const id: number = +req.params.id;
  const { statusCode, message } = await deleteRecipe(id, req.userId);

  return res.status(statusCode).json({ message });
};

export const _updateRecipe = async (req: MyUserRequest, res: Response) => {
  const id: number = +req.params.id;
  const { title, description, ingredients } = req.body;
  const { updated, statusCode } = await updateRecipe(
    id,
    req.userId,
    title,
    description,
    ingredients,
  );

  return res.status(statusCode).json(updated);
};
