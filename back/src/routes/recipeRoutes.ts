import express from 'express';
import { Router } from 'express';
import { isAuth } from '../middleware/isAuth';
import { RecipeController } from '@controller/recipe/recipeController';

const recipeRouter: Router = express.Router();
const { prototype: recipeController } = RecipeController;

recipeRouter.get('/api/recipes', isAuth, recipeController._Recipes);
recipeRouter.get('/api/recipes/:id', isAuth, recipeController._getRecipe);
recipeRouter.post('/api/recipes', isAuth, recipeController._createRecipe);
recipeRouter.delete('/api/recipes/:id', isAuth, recipeController._deleteRecipe);
recipeRouter.put('/api/recipes/:id', isAuth, recipeController._updateRecipe);

export { recipeRouter };
