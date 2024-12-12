import { prisma } from '@/lib/db';
import { hash } from 'bcryptjs';

async function main() {
  // Create test user
  const hashedPassword = await hash('test123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  });

  // Create sample recipes
  const recipes = [
    {
      name: 'Poulet Rôti aux Herbes',
      category: 'Plat Principal',
      ingredients: [
        { name: 'Poulet entier', quantity: '1.5', unit: 'kg' },
        { name: 'Thym frais', quantity: '4', unit: 'branches' },
      ],
      steps: [
        'Préchauffer le four à 180°C',
        'Assaisonner le poulet',
      ],
      cookingTime: 'Long',
      prepTime: 20,
      difficulty: 'Moyen',
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6',
      userId: user.id,
    },
  ];

  for (const recipe of recipes) {
    await prisma.recipe.create({
      data: recipe,
    });
  }

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });