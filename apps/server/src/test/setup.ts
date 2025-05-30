import { vi } from 'vitest';

// Extend global interface for test helpers
declare global {
  var sleep: (ms: number) => Promise<void>;
}

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

// Mock bcrypt for faster tests - but allow real functionality in utility tests
vi.mock('bcrypt', async () => {
  const actual = await vi.importActual('bcrypt');
  return {
    default: {
      hash: vi.fn().mockResolvedValue('$2b$12$mockedhashedpassword123456'),
      compare: vi.fn().mockResolvedValue(true),
    },
    hash: vi.fn().mockResolvedValue('$2b$12$mockedhashedpassword123456'),
    compare: vi.fn().mockResolvedValue(true),
    // Keep actual bcrypt for utility tests
    ...actual,
  };
});

// Mock jsonwebtoken - but allow real functionality in utility tests
vi.mock('jsonwebtoken', async () => {
  const actual = await vi.importActual('jsonwebtoken');
  return {
    default: {
      sign: vi.fn().mockReturnValue('mock.jwt.token'),
      verify: vi.fn().mockReturnValue({ userId: 'mock-user-id' }),
    },
    sign: vi.fn().mockReturnValue('mock.jwt.token'),
    verify: vi.fn().mockReturnValue({ userId: 'mock-user-id' }),
    // Keep actual JWT for utility tests
    ...actual,
  };
});

// Disable process exit during tests
const originalProcessExit = process.exit;
process.exit = vi.fn() as any;

// Disable graceful shutdown signal handlers during tests
const originalOn = process.on;
process.on = vi.fn((event, handler) => {
  if (['SIGTERM', 'SIGINT', 'uncaughtException', 'unhandledRejection'].includes(event)) {
    // Don't register these handlers during tests
    return process as any;
  }
  return originalOn.call(process, event, handler);
}) as any;

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-at-least-32-characters-long';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-at-least-32-chars';
process.env.COOKIE_SECRET = 'test-cookie-secret-at-least-32-characters';
process.env.BCRYPT_ROUNDS = '10';
process.env.MAX_LOGIN_ATTEMPTS = '5';
process.env.LOCK_TIME = '7200000';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5434/test';

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

// Global test helpers
global.sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Cleanup function to restore original functions
export const restoreOriginals = () => {
  process.exit = originalProcessExit;
  process.on = originalOn;
};
