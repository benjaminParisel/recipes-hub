'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ingredient } from "@/lib/types";
import { Trash2 } from "lucide-react";

interface IngredientInputProps {
  ingredient: Ingredient;
  onUpdate: (ingredient: Ingredient) => void;
  onRemove: () => void;
}

const units = [
  "g", "kg", "ml", "cl", "l", "cuillère à café", "cuillère à soupe",
  "pincée", "unité", "tranche", "gousse", "autres"
];

export function IngredientInput({ ingredient, onUpdate, onRemove }: IngredientInputProps) {
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Nom de l'ingrédient"
        value={ingredient.name}
        onChange={(e) => onUpdate({ ...ingredient, name: e.target.value })}
        className="flex-1"
      />
      <Input
        type="number"
        placeholder="Quantité"
        value={ingredient.quantity}
        onChange={(e) => onUpdate({ ...ingredient, quantity: e.target.value })}
        className="w-24"
      />
      <Select
        value={ingredient.unit}
        onValueChange={(value) => onUpdate({ ...ingredient, unit: value })}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Unité" />
        </SelectTrigger>
        <SelectContent>
          {units.map((unit) => (
            <SelectItem key={unit} value={unit}>
              {unit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="text-destructive hover:text-destructive/90"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}