import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function connectMongoDB(): Promise<void> {
  try {
    // Test connection to the database
    await prisma.$connect();
    console.log('Connected to MongoDB successfully via Prisma.');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB.');
  }
}

// To ensure the database connection is cleanly shut down when the app exits
export async function disconnectMongoDB(): Promise<void> {
  try {
    await prisma.$disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
}
