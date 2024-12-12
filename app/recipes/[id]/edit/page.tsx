'use client';

import { useRouter } from 'next/navigation';
import { useRecipeStore } from '@/lib/store';
import { RecipeForm } from '@/components/forms/recipe-form/recipe-form';
import { Recipe } from '@/lib/types';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { recipes } from '@/lib/data';
import { useAuthStore } from '@/lib/auth-store';

export default function EditRecipePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { updateRecipe } = useRecipeStore();
  const { toast } = useToast();
  const recipe = recipes.find((r) => r.id === params.id);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (recipe && recipe.authorId !== user.id) {
      router.push(`/recipes/${params.id}`);
    }
  }, [user, router, recipe]);

  const handleSubmit = (updatedRecipe: Recipe) => {
    updateRecipe(updatedRecipe);
    toast({
      title: "Recette mise à jour",
      description: "Votre recette a été mise à jour avec succès",
    });
    router.push(`/recipes/${params.id}`);
  };

  if (!user || !recipe || recipe.authorId !== user.id) return null;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">
          Modifier la recette
        </h1>
        <RecipeForm initialData={recipe} onSubmit={handleSubmit} />
      </div>
    </main>
  );
}