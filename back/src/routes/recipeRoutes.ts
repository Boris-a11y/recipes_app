import express from 'express';
import { Router } from 'express';
import { isAuth } from '../middleware/isAuth';
import {
  _createRecipe,
  _deleteRecipe,
  _getRecipe,
  _Recipes,
  _updateRecipe,
} from '../controller/recipe/recipeController';

const recipeRouter: Router = express.Router();

// recipeRouter.get('/', (_, res) => {
//   res.send('hey');
// });

recipeRouter.get('/api/recipes', isAuth, _Recipes);
recipeRouter.get('/api/recipes/:id', isAuth, _getRecipe);
recipeRouter.post('/api/recipes', isAuth, _createRecipe);
recipeRouter.delete('/api/recipes/:id', isAuth, _deleteRecipe);
recipeRouter.put('/api/recipes/:id', isAuth, _updateRecipe);

export { recipeRouter };
