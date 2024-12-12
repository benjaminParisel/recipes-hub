'use client';

import { recipes } from '@/lib/data';
import { RecipeDetail } from '@/components/recipe-detail';
import { notFound } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const recipe = recipes.find((r) => r.id === params.id);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;
  if (!recipe) return notFound();

  // Ensure required properties are initialized
  const completeRecipe = {
    ...recipe,
    ratings: recipe.ratings || [],
    comments: recipe.comments || [],
    authorId: recipe.authorId || '1',
    authorName: recipe.authorName || 'Test User',
    createdAt: recipe.createdAt || new Date('2024-01-01'),
  };

  return <RecipeDetail recipe={completeRecipe} />;
}