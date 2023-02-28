import { Recipe } from '@entity/Recipe';
import { recipeRepository } from '@repository/repository';
import { RecipeDTO } from '@model/RecipeDTO';
import { UpdateResult } from 'typeorm';

export class RecipeService {
  Recipes = async () => {
    const recipes: Recipe[] = await recipeRepository.find();

    return { recipes, statusCode: 200 };
  };

  getRecipe = async (id: number) => {
    const recipe: Recipe | null = await recipeRepository.findOne({
      where: { id },
    });

    return { recipe, statusCode: 200 };
  };

  createRecipe = async (recipeData: RecipeDTO, owner: string, ownerId: any) => {
    const recipe: Recipe = await recipeRepository.save({
      ...recipeData,
      owner,
      ownerId,
    });
    return { recipe, statusCode: 201 };
  };

  deleteRecipe = async (id: number, userId: any) => {
    const recipe: Recipe | null = await recipeRepository.findOne({
      where: { id },
    });

    if (!recipe) {
      throw new Error('No recipe with such id');
    }

    if (recipe.ownerId !== userId) {
      throw new Error('Unauthorized to do that');
    }

    await recipeRepository.delete({
      id,
    });

    return { statusCode: 200, message: `Deleted post with id: ${id}` };
  };

  updateRecipe = async (
    id: number,
    userId: any,
    title: string,
    description: string,
    ingredients: string[],
  ) => {
    const recipe: Recipe | null = await recipeRepository.findOne({
      where: { id },
    });

    if (!recipe) {
      throw new Error('No recipe with this id');
    }

    if (recipe.ownerId !== userId) {
      throw new Error('Unauthorized to do that!');
    }

    const updated: UpdateResult = await recipeRepository.update(
      { id },
      {
        title,
        description,
        ingredients,
      },
    );

    return { updated, statusCode: 201, message: `Updated post with id: ${id}` };
  };
}
