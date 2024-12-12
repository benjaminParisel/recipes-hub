import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
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
  // Create recipes one by one (MongoDB doesn't support createMany)
  const carbonara = await prisma.recipe.create({
    data: {
      name: 'Classic Spaghetti Carbonara',
      category: 'Italian',
      ingredients: [
        { name: 'Spaghetti', quantity: '400', unit: 'g' },
        { name: 'Eggs', quantity: '4', unit: 'pieces' },
        { name: 'Pecorino Romano', quantity: '100', unit: 'g' },
        { name: 'Guanciale', quantity: '150', unit: 'g' },
        { name: 'Black Pepper', quantity: '2', unit: 'tsp' }
      ],
      steps: [
        'Bring a large pot of salted water to boil',
        'Cook pasta according to package instructions',
        'Meanwhile, crisp up the guanciale',
        'Mix eggs with grated cheese and pepper',
        'Combine everything while pasta is hot'
      ],
      cookingTime: '20 minutes',
      prepTime: 10,
      difficulty: 'Medium',
      image: 'https://example.com/carbonara.jpg',
      userId: user.id
    }
  })

  const omelette = await prisma.recipe.create({
    data: {
      name: 'Classic French Omelette',
      category: 'French',
      ingredients: [
        { name: 'Eggs', quantity: '3', unit: 'pieces' },
        { name: 'Butter', quantity: '30', unit: 'g' },
        { name: 'Salt', quantity: '1', unit: 'pinch' },
        { name: 'Black Pepper', quantity: '1', unit: 'pinch' }
      ],
      steps: [
        'Whisk eggs until well combined',
        'Heat butter in non-stick pan',
        'Pour eggs and stir continuously',
        'Roll omelette when nearly set',
        'Serve immediately'
      ],
      cookingTime: '5 minutes',
      prepTime: 5,
      difficulty: 'Easy',
      image: 'https://example.com/omelette.jpg',
      userId: user.id
    }
  })

  console.log('Seed data created:', { 
    user: { id: user.id, email: user.email },
    recipes: [
      { id: carbonara.id, name: carbonara.name },
      { id: omelette.id, name: omelette.name }
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })