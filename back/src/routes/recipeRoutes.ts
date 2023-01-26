import express from 'express';
import { Router } from 'express';
import { isAuth } from '../middleware/isAuth';
import { createRecipe } from '../controller/recipe/createRecipe.controller';
import { Recipes } from '../controller/recipe/recipes.controller';
import { deleteRecipe } from '../controller/recipe/deleteRecipe.controller';
import { getRecipe } from '../controller/recipe/recipe.controller';
import { updateRecipe } from '../controller/recipe/updateRecipe.controller';

const recipeRouter: Router = express.Router();

recipeRouter.get('/', (_, res) => {
  res.send('hey');
});

//CRUD

recipeRouter.get('/api/recipes', isAuth, Recipes);
recipeRouter.get('/api/recipes/:id', isAuth, getRecipe);
recipeRouter.post('/api/recipes', isAuth, createRecipe);
recipeRouter.delete('/api/recipes/:id', isAuth, deleteRecipe);
recipeRouter.put('/api/recipes/:id', isAuth, updateRecipe);

export { recipeRouter };
