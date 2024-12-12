// Previous imports remain the same...

export function RecipeForm({ onSubmit, initialData }: RecipeFormProps) {
  // Previous state declarations remain the same...

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !cookingTime || !difficulty) return;

    const recipe: Recipe = {
      id: initialData?.id || '',
      name,
      category,
      ingredients,
      steps: steps.filter(Boolean),
      cookingTime,
      prepTime: parseInt(prepTime),
      difficulty,
      image: imagePreview,
      comments: initialData?.comments || [],
      ratings: initialData?.ratings || [],
      authorId: initialData?.authorId || '',
      authorName: initialData?.authorName || '',
      createdAt: initialData?.createdAt || new Date(),
    };

    onSubmit(recipe);
  };

  // Rest of the component remains the same...
}