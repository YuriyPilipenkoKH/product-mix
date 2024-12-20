// lib/prisma.ts
import { PrismaClient, Prisma } from '@prisma/client';

// Add a custom property to the global object
const globalForPrisma = global as typeof global & {
  prisma?: PrismaClient;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

export type Product = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export type Category = Prisma.CategoryGetPayload<{
  include: { products: true };
}>;
