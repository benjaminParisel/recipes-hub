'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { recipes } from '@/lib/data';
import { RecipeCard } from '@/components/recipe-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Star, Clock, Trophy } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  const userRecipes = recipes.filter(recipe => recipe.authorId === user.id);
  const favoriteRecipes = recipes.filter(recipe => 
    recipe.ratings.some(rating => 
      rating.userId === user.id && rating.value >= 4
    )
  );

  const totalRatings = userRecipes.reduce((acc, recipe) => 
    acc + recipe.ratings.length, 0
  );

  const averageRating = userRecipes.length > 0
    ? userRecipes.reduce((acc, recipe) => {
        const recipeAvg = recipe.ratings.length > 0
          ? recipe.ratings.reduce((sum, r) => sum + r.value, 0) / recipe.ratings.length
          : 0;
        return acc + recipeAvg;
      }, 0) / userRecipes.length
    : 0;

  const totalComments = userRecipes.reduce((acc, recipe) => 
    acc + recipe.comments.length, 0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Mon Profil</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recettes Créées
              </CardTitle>
              <ChefHat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userRecipes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Note Moyenne
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {averageRating.toFixed(1)}/5
              </div>
              <p className="text-xs text-muted-foreground">
                {totalRatings} évaluations
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Commentaires Reçus
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalComments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recettes Favorites
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{favoriteRecipes.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="my-recipes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="my-recipes">Mes Recettes</TabsTrigger>
            <TabsTrigger value="favorites">Mes Favoris</TabsTrigger>
          </TabsList>

          <TabsContent value="my-recipes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
              {userRecipes.length === 0 && (
                <div className="col-span-full text-center py-12 bg-card rounded-lg border">
                  <p className="text-muted-foreground">
                    Vous n'avez pas encore créé de recettes.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
              {favoriteRecipes.length === 0 && (
                <div className="col-span-full text-center py-12 bg-card rounded-lg border">
                  <p className="text-muted-foreground">
                    Vous n'avez pas encore de recettes favorites.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}