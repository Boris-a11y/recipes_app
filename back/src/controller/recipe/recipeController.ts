import { Request, Response } from 'express';
import { RecipeDTO } from '@model/RecipeDTO';
import { MyUserRequest } from '@utils/MyUserRequest';
import { RecipeService } from '@services/recipeService';

const { prototype: recipeService } = RecipeService;

export class RecipeController {
  _Recipes = async (_: Request, res: Response) => {
    const { recipes, statusCode } = await recipeService.Recipes();

    return res.status(statusCode).send(recipes);
  };

  _getRecipe = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const { recipe, statusCode } = await recipeService.getRecipe(id);

    return res.status(statusCode).send(recipe);
  };

  _createRecipe = async (req: MyUserRequest, res: Response) => {
    const recipeData: RecipeDTO = req.body;
    const { recipe, statusCode } = await recipeService.createRecipe(
      recipeData,
      req.user,
      req.userId,
    );

    return res.status(statusCode).send(recipe);
  };

  _deleteRecipe = async (req: MyUserRequest, res: Response) => {
    const id: number = +req.params.id;
    const { statusCode, message } = await recipeService.deleteRecipe(
      id,
      req.userId,
    );

    return res.status(statusCode).json({ message });
  };

  _updateRecipe = async (req: MyUserRequest, res: Response) => {
    const id: number = +req.params.id;
    const { title, description, ingredients } = req.body;
    const { updated, statusCode } = await recipeService.updateRecipe(
      id,
      req.userId,
      title,
      description,
      ingredients,
    );

    return res.status(statusCode).json(updated);
  };
}
