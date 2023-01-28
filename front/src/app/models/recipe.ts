export interface Recipe {
  id?: number;
  title: string;
  description: string;
  ingredients: Array<string>;
  owner: string;
}
