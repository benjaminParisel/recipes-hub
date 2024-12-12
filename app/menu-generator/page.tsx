'use client';

import { RecipeCard } from '@/components/recipe-card';
import { Button } from '@/components/ui/button';
import { useRecipeStore } from '@/lib/store';
import { Category, Recipe } from '@/lib/types';
import { Dices } from 'lucide-react';
import { useState } from 'react';

export default function MenuGeneratorPage() {
  const { recipes } = useRecipeStore();
  
  const [menu, setMenu] = useState<Record<Category, Recipe | null>>({
    'Entrée': null,
    'Plat Principal': null,
    'Dessert': null,
  });

  const generateMenu = () => {
    const newMenu: Record<Category, Recipe | null> = {
      'Entrée': null,
      'Plat Principal': null,
      'Dessert': null,
    };

    // Get recipes for each category
    const categorizedRecipes = {
      'Entrée': recipes.filter(recipe => recipe.category === Category.Entree),
      'Plat Principal': recipes.filter(recipe => recipe.category === Category.PlatPrincipal),
      'Dessert': recipes.filter(recipe => recipe.category === Category.Dessert),
    };

    // Generate random selection for each category
    Object.keys(newMenu).forEach((category) => {
      const categoryRecipes = categorizedRecipes[category as Category];
      if (categoryRecipes.length > 0) {
        const randomIndex = Math.floor(Math.random() * categoryRecipes.length);
        newMenu[category as Category] = categoryRecipes[randomIndex];
      }
    });

    setMenu(newMenu);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Générateur de Menu</h1>
          <Button onClick={generateMenu} size="lg" className="bg-primary hover:bg-primary/90">
            <Dices className="mr-2 h-5 w-5" />
            Générer un Menu
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {(Object.keys(menu) as Category[]).map((category) => (
            <div key={category} className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">{category}</h2>
              {menu[category] ? (
                <RecipeCard recipe={menu[category]!} />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center rounded-lg border-2 border-dashed">
                  <p className="text-sm text-muted-foreground">
                    Générez un menu pour voir {category === 'Entrée' ? 'une' : 'un'} {category.toLowerCase()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {Object.values(menu).every((recipe) => recipe === null) && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Cliquez sur le bouton Générer un Menu pour créer une combinaison aléatoire de plats
            </p>
          </div>
        )}
      </div>
    </main>
  );
}