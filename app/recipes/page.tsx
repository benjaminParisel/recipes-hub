'use client';

import { RecipeCard } from '@/components/recipe-card';
import { RecipeSearch } from '@/components/recipe-search';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/auth-store';
import { recipes } from '@/lib/data';
import { useRecipeStore } from '@/lib/store';
import { RecipeFilters } from '@/lib/types';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RecipesPage() {
  const [filters, setFilters] = useState<RecipeFilters>({});
  const { user } = useAuthStore();
  const router = useRouter();
  const recipesStore = useRecipeStore((state) => state.recipes)

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;
  
  const filteredRecipes = recipesStore.filter((recipe) => {
    if (filters.category && recipe.category !== filters.category) return false;
    if (filters.difficulty && recipe.difficulty !== filters.difficulty) return false;
    if (filters.maxTime && recipe.prepTime > filters.maxTime) return false;
    if (filters.author && recipe.authorId !== filters.author) return false;
    if (filters.minRating) {
      const avgRating = recipe.ratings.length > 0
        ? recipe.ratings.reduce((acc, r) => acc + r.value, 0) / recipe.ratings.length
        : 0;
      if (avgRating < filters.minRating) return false;
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        recipe.name.toLowerCase().includes(search) ||
        recipe.ingredients.some((i) => i.name.toLowerCase().includes(search))
      );
    }
    return true;
  });

  // Get unique authors from recipes
  const authors = Array.from(new Set(recipes.map(recipe => recipe.authorId)))
    .map(authorId => {
      const recipe = recipes.find(r => r.authorId === authorId);
      return {
        id: authorId,
        name: recipe?.authorName || 'Unknown'
      };
    });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Recettes</h1>
          <Link href="/recipes/new">
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter une Recette
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside>
            <RecipeSearch 
              filters={filters} 
              onFilterChange={setFilters}
              authors={authors}
            />
          </aside>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe}
                  servings={filters.servings || 4}
                />
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12 bg-card rounded-lg border">
                <p className="text-muted-foreground">
                  Aucune recette trouvée. Essayez d'ajuster vos filtres.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}