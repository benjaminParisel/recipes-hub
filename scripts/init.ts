const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function checkConnection() {
  try {
    await prisma.$connect();
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  checkConnection();
  // Clear existing data
  await prisma.recipe.deleteMany({})
  await prisma.user.deleteMany({})

  // Create a test user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test Chef',
      password: 'test123', // In production, ensure this is properly hashed
      image: 'https://example.com/chef-avatar.jpg',
    },
  })

  // Create sample recipes
  console.log('Creating recipes...')
  
  const recipes = [{
      name: 'Houmous Maison',
      category: 'Apero',
      cookingTime: 'Court',
      nbPerson: 4,
      prepTime: 10,
      difficulty: 'Facile',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe',
      authorId: user.id,
      authorName: user.name,
      steps: [
        'Égoutter et rincer les pois chiches',
        "Mixer tous les ingrédients jusqu'à obtenir une texture lisse",
        'Assaisonner avec sel et poivre',
        "Servir avec un filet d'huile d'olive",
      ],
      ingredients: [
          { name: 'Pois chiches', quantity: 400, unit: 'g' },
          { name: 'Tahini', quantity: 60, unit: 'ml' },
          { name: 'Citron', quantity: 1, unit: 'unité' },
          { name: 'Ail', quantity: 2, unit: 'gousses' },
          { name: "Huile d'olive", quantity: 60, unit: 'ml' },
        ],
      },
      {
        
        name: 'Houmous Maison',
        category: 'Apero',
        ingredients: [
          { name: 'Pois chiches', quantity: '400', unit: 'g' },
          { name: 'Tahini', quantity: '60', unit: 'ml' },
          { name: 'Citron', quantity: '1', unit: 'unité' },
          { name: 'Ail', quantity: '2', unit: 'gousses' },
          { name: 'Huile d\'olive', quantity: '60', unit: 'ml' },
        ],
        steps: [
          'Égoutter et rincer les pois chiches',
          'Mixer tous les ingrédients jusqu\'à obtenir une texture lisse',
          'Assaisonner avec sel et poivre',
          'Servir avec un filet d\'huile d\'olive',
        ],
        cookingTime: 'Court',
        nbPerson:4,
        prepTime: 10,
        difficulty: 'Facile',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe',
        authorId: user.id,
        authorName: user.name,
      },
      {
        name: 'Tapenade d\'Olives',
        category: 'Apero',
        ingredients: [
          { name: 'Olives noires', quantity: '200', unit: 'g' },
          { name: 'Câpres', quantity: '2', unit: 'cuillère à soupe' },
          { name: 'Anchois', quantity: '3', unit: 'filets' },
          { name: 'Ail', quantity: '1', unit: 'gousse' },
          { name: 'Huile d\'olive', quantity: '50', unit: 'ml' },
        ],
        steps: [
          'Dénoyauter les olives',
          'Mixer tous les ingrédients',
          'Ajouter l\'huile d\'olive progressivement',
          'Réserver au frais avant de servir',
        ],
        cookingTime: 'Court',
        nbPerson:4,
        prepTime: 15,
        difficulty: 'Facile',
        image: 'https://images.unsplash.com/photo-1632843149859-ce614f683496',
        authorId: user.id,
        authorName: user.name,
      },
      {
        
        name: 'Guacamole',
        category: 'Apero',
        
        ingredients: [
          { name: 'Avocats', quantity: '3', unit: 'unité' },
          { name: 'Tomate', quantity: '1', unit: 'unité' },
          { name: 'Oignon rouge', quantity: '1', unit: 'unité' },
          { name: 'Citron vert', quantity: '1', unit: 'unité' },
          { name: 'Coriandre', quantity: '1', unit: 'bouquet' },
        ],
        steps: [
          'Écraser les avocats',
          'Couper les légumes en petits dés',
          'Mélanger tous les ingrédients',
          'Assaisonner avec sel, poivre et jus de citron',
        ],
        cookingTime: 'Court',
        nbPerson:6,
        prepTime: 15,
        difficulty: 'Facile',
        image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1',
        authorId: user.id,
        authorName: user.name,
      },
      {
        name: 'Salade César',
        category: 'Entree',
        ingredients: [
          { name: 'Laitue romaine', quantity: '1', unit: 'unité' },
          { name: 'Poulet', quantity: '200', unit: 'g' },
          { name: 'Parmesan', quantity: '50', unit: 'g' },
          { name: 'Croûtons', quantity: '100', unit: 'g' },
          { name: 'Sauce césar', quantity: '100', unit: 'ml' },
        ],
        steps: [
          'Laver et couper la salade',
          'Griller le poulet et le couper en morceaux',
          'Préparer la sauce césar',
          'Assembler tous les ingrédients',
        ],
        cookingTime: 'Court',
        nbPerson:2,
        prepTime: 20,
        difficulty: 'Facile',
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9',        
        authorId: user.id,
        authorName: user.name,
      },
      {
        name: 'Soupe à l\'Oignon',
        category: 'Entree',
        ingredients: [
          { name: 'Oignons', quantity: '6', unit: 'unité' },
          { name: 'Bouillon de boeuf', quantity: '1', unit: 'l' },
          { name: 'Beurre', quantity: '50', unit: 'g' },
          { name: 'Pain', quantity: '4', unit: 'tranches' },
          { name: 'Gruyère râpé', quantity: '100', unit: 'g' },
        ],
        steps: [
          'Faire revenir les oignons dans le beurre',
          'Ajouter le bouillon et laisser mijoter',
          'Disposer le pain et le fromage',
          'Gratiner au four',
        ],
        cookingTime: 'Moyen',
        nbPerson:2,
        prepTime: 30,
        difficulty: 'Moyen',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
        authorId: user.id,
        authorName: user.name,
      },
      {
        name: 'Carpaccio de Saumon',
        category: 'Entree',
        ingredients: [
          { name: 'Saumon frais', quantity: '400', unit: 'g' },
          { name: 'Citron', quantity: '2', unit: 'unité' },
          { name: 'Huile d\'olive', quantity: '50', unit: 'ml' },
          { name: 'Aneth', quantity: '1', unit: 'bouquet' },
          { name: 'Câpres', quantity: '30', unit: 'g' },
        ],
        steps: [
          'Trancher finement le saumon',
          'Arroser de jus de citron et d\'huile',
          'Parsemer d\'aneth et de câpres',
          'Servir très frais',
        ],
        cookingTime: 'Court',
        nbPerson:4,
        prepTime: 15,
        difficulty: 'Moyen',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
        authorId: user.id,
        authorName: user.name,
      },
      {
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
        nbPerson:4,
        prepTime: 20,
        difficulty: 'Moyen',
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6',
        authorId: user.id,
        authorName: user.name,
      },
      {
        name: 'Crème Brûlée',
        category: 'Dessert',
        ingredients: [
          { name: 'Crème fraîche', quantity: '500', unit: 'ml' },
          { name: 'Sucre', quantity: '100', unit: 'g' },
          { name: 'Oeufs', quantity: '4', unit: 'pieces' },
          { name: 'Vanille', quantity: '1', unit: 'gousse' },
        ],
        steps: [
          'Mélanger la crème fraîche, le sucre et les oeufs',
          'Ajouter la vanille et mélanger',
          'Verser dans des ramequins et cuire au bain-marie',
          'Laisser refroidir et saupoudrer de sucre avant de brûler',
        ],
        cookingTime: 'Court',
        nbPerson: 4,
        prepTime: 20,
        difficulty: 'Facile',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
        authorId: user.id,
        authorName: user.name,
      },
    ];

    for (const recipeData of recipes) {
      await prisma.recipe.create({
      data: recipeData
    });
  }

  console.log('Seed data created:');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })