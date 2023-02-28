import express, { Router } from 'express';
import { isAuth } from '@middleware/isAuth';
import { RecipeController } from '@controller/recipe/recipeController';

const recipeRouter: Router = express.Router();
const { prototype: recipeController } = RecipeController;

recipeRouter.get('/api/recipes', isAuth, recipeController.Recipes);
recipeRouter.get('/api/recipes/:id', isAuth, recipeController.getRecipe);
recipeRouter.post('/api/recipes', isAuth, recipeController.createRecipe);
recipeRouter.delete('/api/recipes/:id', isAuth, recipeController.deleteRecipe);
recipeRouter.put('/api/recipes/:id', isAuth, recipeController.updateRecipe);

export { recipeRouter };
