import { PrismaClient } from '@prisma/client';

// Prevent multiple instances during development/hot reloading
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Configure connection pool for production
const prismaClientSingleton = () => {
  return new PrismaClient({
    // Add connection pooling configuration for production
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

const prisma = global.prisma || prismaClientSingleton();

// Set the global for development environments
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
