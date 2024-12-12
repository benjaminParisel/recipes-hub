import { Recipe } from './types';

const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Poulet Rôti aux Herbes',
    category: 'Plat Principal',
    ingredients: [
      { name: 'Poulet entier', quantity: '1.5', unit: 'kg' },
      { name: 'Thym frais', quantity: '4', unit: 'branches' },
      { name: 'Romarin', quantity: '2', unit: 'branches' },
      { name: 'Ail', quantity: '6', unit: 'gousses' },
      { name: 'Beurre', quantity: '100', unit: 'g' },
    ],
    steps: [
      'Préchauffer le four à 180°C',
      'Assaisonner le poulet de sel et poivre',
      'Insérer les herbes et l\'ail sous la peau',
      'Badigeonner de beurre fondu',
      'Cuire 1h30 en arrosant régulièrement',
    ],
    cookingTime: 'Long',
    prepTime: 20,
    difficulty: 'Moyen',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6',
    authorId: '1',
    authorName: 'Test User',
    ratings: [],
    comments: [],
    createdAt: new Date('2024-01-01'),
  },
  // ... rest of the recipes with the same structure
];

// Update all other recipes to include the new required fields
recipes.forEach(recipe => {
  if (!recipe.ratings) recipe.ratings = [];
  if (!recipe.comments) recipe.comments = [];
  if (!recipe.authorId) recipe.authorId = '1';
  if (!recipe.authorName) recipe.authorName = 'Test User';
  if (!recipe.createdAt) recipe.createdAt = new Date('2024-01-01');
});

export { recipes };