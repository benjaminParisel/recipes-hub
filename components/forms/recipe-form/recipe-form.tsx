'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/lib/auth-store';
import { Category, Difficulty, Ingredient, Recipe } from '@/lib/types';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ImageUpload } from './image-upload';
import { IngredientInput } from './ingredient-input';
import { StepInput } from './step-input';

interface RecipeFormProps {
  initialData?: Recipe;
  onSubmit: (recipe: Recipe) => void;
}

const emptyIngredient = (): Ingredient => ({
  name: '',
  quantity: '',
  unit: '',
});

export function RecipeForm({ initialData, onSubmit }: RecipeFormProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { toast } = useToast();

  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState<Category>(
    initialData?.category || Category.PlatPrincipal
  );
  const [difficulty, setDifficulty] = useState<Difficulty>(
    initialData?.difficulty || 'Moyen'
  );
  const [prepTime, setPrepTime] = useState(initialData?.prepTime?.toString() || '30');
  const [image, setImage] = useState(initialData?.image || '');
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialData?.ingredients || [emptyIngredient()]
  );
  const [steps, setSteps] = useState<string[]>(
    initialData?.steps || ['']
  );
  const [nbPerson, setNbPerson] = useState(initialData?.nbPerson?.toString() || '4');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour créer une recette",
        variant: "destructive",
      });
      return;
    }

    if (!name || !category || !difficulty || !prepTime || !nbPerson) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const recipe: Recipe = {
      id: initialData?.id || crypto.randomUUID(),
      name,
      category,
      ingredients: ingredients.filter(i => i.name && i.quantity && i.unit),
      steps: steps.filter(Boolean),
      cookingTime: 'Moyen',
      prepTime: parseInt(prepTime),
      difficulty,
      image,
      authorId: user.id,
      authorName: user.name || 'Utilisateur',
      ratings: initialData?.ratings || [],
      comments: initialData?.comments || [],
      createdAt: initialData?.createdAt || new Date(),
      nbPerson: parseInt(nbPerson),
    };

    onSubmit(recipe);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <ImageUpload value={image} onChange={setImage} />

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de la recette</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Poulet rôti aux herbes"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={category} onValueChange={(value: Category) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue />
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
            <Label htmlFor="difficulty">Difficulté</Label>
            <Select
              value={difficulty}
              onValueChange={(value: Difficulty) => setDifficulty(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Facile">Facile</SelectItem>
                <SelectItem value="Moyen">Moyen</SelectItem>
                <SelectItem value="Difficile">Difficile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prepTime">Temps de préparation (minutes)</Label>
            <Input
              id="prepTime"
              type="number"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nbPerson">Nombre de personnes</Label>
            <Input
              id="nbPerson"
              type="number"
              value={nbPerson}
              onChange={(e) => setNbPerson(e.target.value)}
              min="1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Ingrédients</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIngredients([...ingredients, emptyIngredient()])}
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un ingrédient
            </Button>
          </div>
          <div className="space-y-2">
            {ingredients.map((ingredient, index) => (
              <IngredientInput
                key={index}
                ingredient={ingredient}
                onUpdate={(updated) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index] = updated;
                  setIngredients(newIngredients);
                }}
                onRemove={() => {
                  setIngredients(ingredients.filter((_, i) => i !== index));
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Étapes</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSteps([...steps, ''])}
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une étape
            </Button>
          </div>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <StepInput
                key={index}
                step={step}
                index={index}
                onUpdate={(value) => {
                  const newSteps = [...steps];
                  newSteps[index] = value;
                  setSteps(newSteps);
                }}
                onRemove={() => {
                  setSteps(steps.filter((_, i) => i !== index));
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Annuler
        </Button>
        <Button type="submit">
          {initialData ? 'Mettre à jour' : 'Créer'} la recette
        </Button>
      </div>
    </form>
  );
}