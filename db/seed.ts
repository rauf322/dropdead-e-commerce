import { PrismaClient } from '@prisma/client';
import { sampleData } from './sampleData';

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();

  const productsWithoutId = sampleData.products.map(
    ({ id, ...product }) => product,
  );
  await prisma.product.createMany({ data: productsWithoutId });
  console.log(`Database has been seeded with sample data.`);
}

main();
