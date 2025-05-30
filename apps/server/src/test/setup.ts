import { vi } from 'vitest';

// Mock Prisma client
vi.mock('../lib/prisma', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      findFirst: vi.fn(),
    },
    $disconnect: vi.fn(),
  },
}));

// Mock bcrypt for faster tests
vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('$2b$12$mockedhashedpassword123456'),
    compare: vi.fn().mockResolvedValue(true),
  },
  hash: vi.fn().mockResolvedValue('$2b$12$mockedhashedpassword123456'),
  compare: vi.fn().mockResolvedValue(true),
}));

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-at-least-32-characters-long';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-at-least-32-chars';
process.env.COOKIE_SECRET = 'test-cookie-secret-at-least-32-characters';
process.env.BCRYPT_ROUNDS = '10';
process.env.MAX_LOGIN_ATTEMPTS = '5';
process.env.LOCK_TIME = '7200000';
