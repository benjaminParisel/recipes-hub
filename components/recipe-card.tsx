import { Recipe } from '@/lib/types';
import { Clock, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: Recipe;
  servings?: number;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const difficultyColor = {
    'Facile': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    'Moyen': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
    'Difficile': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  }[recipe.difficulty];

  const averageRating = recipe.ratings.length > 0
    ? recipe.ratings.reduce((acc, r) => acc + r.value, 0) / recipe.ratings.length
    : 0;

  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border">
        <div className="relative aspect-[4/3]">
          <Image
            src={recipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352'}
            alt={recipe.name}
            fill
            className="object-cover"
          />
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${difficultyColor}`}>
            {recipe.difficulty}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-card-foreground">{recipe.name}</h3>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {recipe.prepTime} min
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {recipe.nbPerson} portions
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Par {recipe.authorName}</span>
            {averageRating > 0 && (
              <div className="flex items-center text-primary">
                <Star className="w-4 h-4 fill-current mr-1" />
                <span>{averageRating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}