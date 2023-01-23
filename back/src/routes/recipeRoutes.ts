import express from 'express';
import { Router } from 'express';
import { isAuth } from '../middleware/isAuth';
import { createRecipe } from '../controller/recipe/createRecipe.controller';
import { Recipes } from '../controller/recipe/recipes.controller';

const recipeRouter: Router = express.Router();

recipeRouter.get('/', (_, res) => {
  res.send('hey');
});

//CRUD

recipeRouter.get('/api/recipes', Recipes); //ADD BACK OUT GUARD, REMOVED DUE TO TESTING
recipeRouter.post('/api/recipes', isAuth, createRecipe); //ADD BACK OUT GUARD, REMOVED DUE TO TESTING

export { recipeRouter };
