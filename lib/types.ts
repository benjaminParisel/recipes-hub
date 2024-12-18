export enum Category {
  Apero = 'Apero',
  Entree = 'Entree',
  PlatPrincipal = 'Plat Principal',
  Dessert = 'Dessert',
}

export type Difficulty = 'Facile' | 'Moyen' | 'Difficile';
export type CookingTime = 'Court' | 'Moyen' | 'Long';

export interface Rating {
  id: string;
  userId: string;
  userName: string;
  value: number;
  createdAt: Date;
}

export interface Comment {
  id: string;
  text: string;
  authorName: string;
  createdAt: Date;
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: Category;
  ingredients: Ingredient[];
  steps: string[];
  cookingTime: CookingTime;
  prepTime: number;
  difficulty: Difficulty;
  nbPerson: number;
  image?: string;
  comments: Comment[];
  authorId: string;
  authorName: string;
  ratings: Rating[];
  createdAt: Date;
}

export interface RecipeFilters {
  search?: string;
  category?: Category;
  cookingTime?: CookingTime;
  difficulty?: Difficulty;
  maxTime?: number;
  servings?: number;
  minRating?: number;
  author?: string;
}