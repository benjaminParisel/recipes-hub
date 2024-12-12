'use client';

import { useRecipeStore } from '@/lib/store';
import { Category, CookingTime, Difficulty } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';

export function RecipeFilters() {
  const { filters, setFilters } = useRecipeStore();

  const clearFilters = () => setFilters({});

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Input
        placeholder="Search recipes..."
        value={filters.search || ''}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="sm:max-w-[200px]"
      />
      
      <Select
        value={filters.category}
        onValueChange={(value: Category) =>
          setFilters({ ...filters, category: value })
        }
      >
        <SelectTrigger className="sm:max-w-[200px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Appetizer">Appetizer</SelectItem>
          <SelectItem value="Main Course">Main Course</SelectItem>
          <SelectItem value="Dessert">Dessert</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.cookingTime}
        onValueChange={(value: CookingTime) =>
          setFilters({ ...filters, cookingTime: value })
        }
      >
        <SelectTrigger className="sm:max-w-[200px]">
          <SelectValue placeholder="Cooking Time" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Short">Short</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Long">Long</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.difficulty}
        onValueChange={(value: Difficulty) =>
          setFilters({ ...filters, difficulty: value })
        }
      >
        <SelectTrigger className="sm:max-w-[200px]">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Easy">Easy</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Hard">Hard</SelectItem>
        </SelectContent>
      </Select>

      {(filters.search || filters.category || filters.cookingTime || filters.difficulty) && (
        <Button
          variant="ghost"
          size="icon"
          onClick={clearFilters}
          className="shrink-0"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear filters</span>
        </Button>
      )}
    </div>
  );
}