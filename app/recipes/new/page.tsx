'use client';

import { useRouter } from 'next/navigation';
import { useRecipeStore } from '@/lib/store';
import { RecipeForm } from '@/components/forms/recipe-form/recipe-form';
import { Recipe } from '@/lib/types';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/lib/auth-store';

export default function NewRecipePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { addRecipe } = useRecipeStore();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleSubmit = (recipe: Recipe) => {
    addRecipe(recipe);
    toast({
      title: "Recette créée",
      description: "Votre recette a été créée avec succès",
    });
    router.push('/recipes');
  };

  if (!user) return null;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">
          Créer une nouvelle recette
        </h1>
        <RecipeForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}