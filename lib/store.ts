import { create } from 'zustand';
import { recipes as initialRecipes } from './data';
import { Recipe, RecipeFilters } from './types';

interface RecipeStore {
  recipes: Recipe[];
  filters: RecipeFilters;
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  setFilters: (filters: RecipeFilters) => void;
}

export const useRecipeStore = create<RecipeStore>((set) => ({
  
  recipes: process.env.NODE_ENV === 'development' ? initialRecipes : [], // Will be populated from MongoDB in production
  filters: {},
  addRecipe: (recipe) =>
    set((state) => {
      const newState = { recipes: [...state.recipes, recipe] };
      console.log('New state:', newState);
      return newState;
    }
    ),
  updateRecipe: (recipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) => (r.id === recipe.id ? recipe : r)),
    })),
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
    })),
  setFilters: (filters) => set({ filters }),
}));