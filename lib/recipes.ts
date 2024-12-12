import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const recipes = await prisma.recipe.findMany();
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, category, ingredients, steps, cookingTime, prepTime, difficulty, nbPerson, image, userId } = req.body;
      const newRecipe = await prisma.recipe.create({
        data: {
          name,
          category,
          ingredients,
          steps,
          cookingTime,
          prepTime,
          difficulty,
          nbPerson,
          image,
          userId,
        },
      });
      res.status(201).json(newRecipe);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create recipe' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}