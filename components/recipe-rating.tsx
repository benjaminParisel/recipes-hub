'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecipeRatingProps {
  currentRating?: number;
  onRate: (rating: number) => void;
  disabled?: boolean;
}

export function RecipeRating({ currentRating, onRate, disabled }: RecipeRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg border">
      <p className="text-sm font-medium">
        {disabled 
          ? "Connectez-vous pour noter cette recette" 
          : "Notez cette recette"}
      </p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            className={cn(
              "p-1 transition-colors",
              disabled ? "cursor-not-allowed opacity-50" : "hover:text-primary"
            )}
            onMouseEnter={() => setHoverRating(rating)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => !disabled && onRate(rating)}
            disabled={disabled}
          >
            <Star
              className={cn(
                "h-8 w-8",
                (hoverRating || currentRating || 0) >= rating
                  ? "fill-primary text-primary"
                  : "fill-none text-muted-foreground"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}