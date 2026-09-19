const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.product.count();
  const sample = await prisma.product.findMany({ take: 3, select: { id: true, name: true, sizes: true } });
  const customersCount = await prisma.customer.count();
  const ordersCount = await prisma.order.count();
  console.log({ count, sample, customersCount, ordersCount });
}

main().finally(() => prisma.$disconnect());
