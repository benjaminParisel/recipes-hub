'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Clock, ChefHat, ArrowLeft, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Recipe } from '@/lib/types';
import { useAuthStore } from '@/lib/auth-store';
import { useRecipeStore } from '@/lib/store';
import { RecipeComments } from '@/components/recipe-comments';
import { RecipeRating } from '@/components/recipe-rating';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface RecipeDetailProps {
  recipe: Recipe;
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { updateRecipe, deleteRecipe } = useRecipeStore();

  const handleDelete = () => {
    deleteRecipe(recipe.id);
    router.push('/recipes');
  };

  const handleAddComment = (text: string) => {
    if (!user) return;

    const newComment = {
      id: crypto.randomUUID(),
      text,
      authorName: user.name,
      createdAt: new Date(),
    };

    const updatedRecipe = {
      ...recipe,
      comments: [...recipe.comments, newComment],
    };

    updateRecipe(updatedRecipe);
  };

  const handleRating = (value: number) => {
    if (!user) return;

    const existingRating = recipe.ratings.find(r => r.userId === user.id);
    let newRatings = recipe.ratings;

    if (existingRating) {
      newRatings = recipe.ratings.map(r => 
        r.userId === user.id ? { ...r, value } : r
      );
    } else {
      newRatings = [...recipe.ratings, {
        id: crypto.randomUUID(),
        userId: user.id,
        userName: user.name,
        value,
        createdAt: new Date()
      }];
    }

    updateRecipe({ ...recipe, ratings: newRatings });
  };

  const averageRating = recipe.ratings.length > 0
    ? recipe.ratings.reduce((acc, r) => acc + r.value, 0) / recipe.ratings.length
    : 0;

  const canEdit = user?.id === recipe.authorId;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/recipes">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux Recettes
            </Button>
          </Link>
          {canEdit && (
            <div className="flex gap-2">
              <Link href={`/recipes/${recipe.id}/edit`}>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action ne peut pas être annulée. La recette sera définitivement supprimée.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>

        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={recipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352'}
            alt={recipe.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{recipe.name}</h1>
            <Badge variant="secondary" className="text-lg">
              {recipe.category}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              {recipe.prepTime} minutes de préparation
            </div>
            <div className="flex items-center">
              <ChefHat className="mr-2 h-5 w-5" />
              Difficulté : {recipe.difficulty}
            </div>
            {averageRating > 0 && (
              <div className="flex items-center">
                <span className="font-medium">
                  {averageRating.toFixed(1)} / 5 ({recipe.ratings.length} votes)
                </span>
              </div>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Par {recipe.authorName}</p>
            <p>
              Créé {formatDistanceToNow(new Date(recipe.createdAt), {
                addSuffix: true,
                locale: fr,
              })}
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Ingrédients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex justify-between">
                  <span>{ingredient.name}</span>
                  <span className="text-muted-foreground">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="font-medium text-muted-foreground">
                    {index + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        <div className="mt-8 space-y-8">
          <RecipeRating
            currentRating={recipe.ratings.find(r => r.userId === user?.id)?.value}
            onRate={handleRating}
            disabled={!user}
          />

          <RecipeComments
            comments={recipe.comments}
            onAddComment={handleAddComment}
          />
        </div>
      </div>
    </main>
  );
}