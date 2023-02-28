export type RecipeDTO = {
  id: number;
  title: string;
  description: string;
  ingredients: Array<string>;
  ownerId: number;
};
