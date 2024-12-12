'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Category, Difficulty, RecipeFilters } from '@/lib/types';
import { X } from 'lucide-react';

interface RecipeSearchProps {
  filters: RecipeFilters;
  onFilterChange: (filters: RecipeFilters) => void;
  authors: { id: string; name: string }[];
}

export function RecipeSearch({ filters, onFilterChange, authors }: RecipeSearchProps) {
  const resetFilters = () => onFilterChange({});
  const hasActiveFilters = Object.keys(filters).length > 0;

  const clearCategory = () => {
    const { category, ...rest } = filters;
    onFilterChange(rest);
  };

  const clearDifficulty = () => {
    const { difficulty, ...rest } = filters;
    onFilterChange(rest);
  };

  const clearAuthor = () => {
    const { author, ...rest } = filters;
    onFilterChange(rest);
  };

  const clearRating = () => {
    const { minRating, ...rest } = filters;
    onFilterChange(rest);
  };

  return (
    <div className="bg-card rounded-lg shadow-sm p-6 space-y-6 border sticky top-20">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-card-foreground">Filtres</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground">Recherche</label>
          <Input
            placeholder="Nom ou ingrédient..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="border-input"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-card-foreground">Catégorie</label>
            {filters.category && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCategory}
                className="h-6 px-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3 mr-1" />
                Toutes
              </Button>
            )}
          </div>
          <Select
             value={filters.category}
            onValueChange={(value: Category | undefined) => 
              onFilterChange({ ...filters, category: value })
            }
          >
            <SelectTrigger className="bg-card border-input">
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={Category.Apero}>{Category.Apero}</SelectItem>
                <SelectItem value={Category.Entree}>{Category.Entree}</SelectItem>
                <SelectItem value={Category.PlatPrincipal}>{Category.PlatPrincipal}</SelectItem>
                <SelectItem value={Category.Dessert}>{Category.Dessert}</SelectItem>
              </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-card-foreground">Difficulté</label>
            {filters.difficulty && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearDifficulty}
                className="h-6 px-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3 mr-1" />
                Toutes
              </Button>
            )}
          </div>
          <Select
            value={filters.difficulty}
            onValueChange={(value: Difficulty | undefined) => 
              onFilterChange({ ...filters, difficulty: value })
            }
          >
            <SelectTrigger className="bg-card border-input">
              <SelectValue placeholder="Toutes les difficultés" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Facile">Facile</SelectItem>
              <SelectItem value="Moyen">Moyen</SelectItem>
              <SelectItem value="Difficile">Difficile</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-card-foreground">Auteur</label>
            {filters.author && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAuthor}
                className="h-6 px-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3 mr-1" />
                Tous
              </Button>
            )}
          </div>
          <Select
            value={filters.author}
            onValueChange={(value: string | undefined) => 
              onFilterChange({ ...filters, author: value })
            }
          >
            <SelectTrigger className="bg-card border-input">
              <SelectValue placeholder="Tous les auteurs" />
            </SelectTrigger>
            <SelectContent>
              {authors.map((author) => (
                <SelectItem key={author.id} value={author.id}>
                  {author.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-card-foreground">Note minimum</label>
            {filters.minRating && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearRating}
                className="h-6 px-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3 mr-1" />
                Aucune
              </Button>
            )}
          </div>
          <Select
            value={filters.minRating?.toString()}
            onValueChange={(value: string | undefined) => 
              onFilterChange({ ...filters, minRating: value ? parseInt(value) : undefined })
            }
          >
            <SelectTrigger className="bg-card border-input">
              <SelectValue placeholder="Toutes les notes" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((rating) => (
                <SelectItem key={rating} value={rating.toString()}>
                  {rating} étoile{rating > 1 ? 's' : ''} ou plus
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-card-foreground">
              Temps de préparation
            </label>
            <span className="text-sm text-muted-foreground">
              {filters.maxTime || 180} min
            </span>
          </div>
          <Slider
            value={[filters.maxTime || 180]}
            min={0}
            max={180}
            step={5}
            className="[&>span]:bg-primary"
            onValueChange={([value]) =>
              onFilterChange({ ...filters, maxTime: value })
            }
          />
        </div>

        {hasActiveFilters && (
          <div className="pt-4 border-t">
            <Button
              variant="outline"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/80"
              onClick={resetFilters}
            >
              <X className="mr-2 h-4 w-4" />
              Réinitialiser tous les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}