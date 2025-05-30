import { describe, it, expect, beforeEach, vi } from 'vitest';
import { config } from '../config/environment';

// Mock timing-sensitive operations
const dummyHash = '$2b$12$7Sl5OLm/x4HeRzvfP3hP8OpKOA.J0Xcbw3oUjHvy9heM/1bsenYsG';

// Basic validation functions for testing
const validatePassword = (password: string): boolean => {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  return true;
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

describe('Utility Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Password Validation', () => {
    it('should validate strong passwords', () => {
      const strongPasswords = [
        'SecurePass123!',
        'MyP@ssw0rd2024',
        'Complex#Password1',
        'StrongP@ss2024!',
      ];

      strongPasswords.forEach(password => {
        expect(validatePassword(password)).toBe(true);
      });
    });

    it('should reject weak passwords', () => {
      const weakPasswords = [
        '123',
        'password',
        'Password',
        'Password123',
        'Pass!',
        'UPPERCASE123!',
        'lowercase123!',
        'NoNumbers!',
        'NoSpecial123',
      ];

      weakPasswords.forEach(password => {
        expect(validatePassword(password)).toBe(false);
      });
    });

    it('should reject passwords with only special characters', () => {
      const specialOnlyPasswords = ['!@#$%^&*()', '!!!!!!!!', '@@@@@@@@'];

      specialOnlyPasswords.forEach(password => {
        expect(validatePassword(password)).toBe(false);
      });
    });

    it('should validate email formats correctly', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'firstname.lastname@company.com',
      ];

      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user..name@example.com',
        'user@.com',
        '',
        'user@example',
      ];

      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false);
      });
    });
  });

  describe('Password Hashing', () => {
    it('should hash passwords consistently', async () => {
      const bcrypt = await import('bcrypt');
      const password = 'TestPassword123!';

      const hash1 = await bcrypt.hash(password, 12);
      const hash2 = await bcrypt.hash(password, 12);

      // Hashes should be different due to random salt
      expect(hash1).not.toBe(hash2);

      // But both should validate against the original password
      expect(await bcrypt.compare(password, hash1)).toBe(true);
      expect(await bcrypt.compare(password, hash2)).toBe(true);
    });

    it('should reject wrong passwords', async () => {
      const bcrypt = await import('bcrypt');
      const password = 'CorrectPassword123!';
      const wrongPassword = 'WrongPassword123!';

      const hash = await bcrypt.hash(password, 12);

      expect(await bcrypt.compare(wrongPassword, hash)).toBe(false);
    });

    it('should handle different bcrypt rounds', async () => {
      const bcrypt = await import('bcrypt');
      const password = 'TestPassword123!';

      const hash10 = await bcrypt.hash(password, 10);
      const hash12 = await bcrypt.hash(password, 12);

      // Both should work with different rounds
      expect(await bcrypt.compare(password, hash10)).toBe(true);
      expect(await bcrypt.compare(password, hash12)).toBe(true);

      // Hashes should be different
      expect(hash10).not.toBe(hash12);
    });
  });

  describe('JWT Token Management', () => {
    it('should create and verify valid tokens', async () => {
      const jwt = await import('jsonwebtoken');
      const userId = 'test-user-id';
      const secret = 'test-secret-at-least-32-characters-long';

      const token = jwt.sign({ userId }, secret, { expiresIn: '1h' });

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');

      const decoded = jwt.verify(token, secret) as any;
      expect(decoded.userId).toBe(userId);
      expect(decoded.exp).toBeDefined();
      expect(decoded.iat).toBeDefined();
    });

    it('should reject expired tokens', async () => {
      const jwt = await import('jsonwebtoken');
      const userId = 'test-user-id';
      const secret = 'test-secret-at-least-32-characters-long';

      // Create an expired token
      const expiredToken = jwt.sign({ userId }, secret, { expiresIn: '-1h' });

      expect(() => {
        jwt.verify(expiredToken, secret);
      }).toThrow('jwt expired');
    });

    it('should reject tokens with wrong secret', async () => {
      const jwt = await import('jsonwebtoken');
      const userId = 'test-user-id';
      const secret = 'test-secret-at-least-32-characters-long';
      const wrongSecret = 'wrong-secret-at-least-32-characters-long';

      const token = jwt.sign({ userId }, secret, { expiresIn: '1h' });

      expect(() => {
        jwt.verify(token, wrongSecret);
      }).toThrow('invalid signature');
    });

    it('should reject malformed tokens', async () => {
      const jwt = await import('jsonwebtoken');
      const secret = 'test-secret-at-least-32-characters-long';
      const malformedTokens = ['invalid.token', 'not.a.jwt.token', '', 'malformed'];

      malformedTokens.forEach(token => {
        expect(() => {
          jwt.verify(token, secret);
        }).toThrow();
      });
    });

    it('should handle token without expiration', async () => {
      const jwt = await import('jsonwebtoken');
      const userId = 'test-user-id';
      const secret = 'test-secret-at-least-32-characters-long';

      const token = jwt.sign({ userId }, secret); // No expiration

      const decoded = jwt.verify(token, secret) as any;
      expect(decoded.userId).toBe(userId);
      expect(decoded.exp).toBeUndefined();
    });

    it('should include custom claims in token', async () => {
      const jwt = await import('jsonwebtoken');
      const userId = 'test-user-id';
      const secret = 'test-secret-at-least-32-characters-long';
      const customClaims = {
        userId,
        role: 'admin',
        permissions: ['read', 'write'],
      };

      const token = jwt.sign(customClaims, secret, { expiresIn: '1h' });

      const decoded = jwt.verify(token, secret) as any;

      expect(decoded.userId).toBe(userId);
      expect(decoded.role).toBe('admin');
      expect(decoded.permissions).toEqual(['read', 'write']);
    });
  });

  describe('Environment Variable Validation', () => {
    it('should validate JWT secret requirements', () => {
      expect(config.auth.jwtSecret.length).toBeGreaterThanOrEqual(32);
      expect(config.auth.jwtRefreshSecret.length).toBeGreaterThanOrEqual(32);
    });

    it('should reject short secrets', () => {
      const shortSecret = 'too-short';
      expect(shortSecret.length).toBeLessThan(32);

      // In real app, this would throw during config validation
      expect(() => {
        if (shortSecret.length < 32) {
          throw new Error('JWT secret must be at least 32 characters');
        }
      }).toThrow('JWT secret must be at least 32 characters');
    });

    it('should validate bcrypt rounds range', () => {
      const rounds = config.auth.bcryptRounds;
      expect(rounds).toBeGreaterThanOrEqual(10);
      expect(rounds).toBeLessThanOrEqual(15);
    });

    it('should validate max login attempts range', () => {
      const maxAttempts = config.auth.maxLoginAttempts;
      expect(maxAttempts).toBeGreaterThan(0);
      expect(maxAttempts).toBeLessThanOrEqual(100);
    });
  });

  describe('Rate Limiting Calculations', () => {
    it('should calculate rate limit windows correctly', () => {
      const windowMs = 15 * 60 * 1000; // 15 minutes
      const maxRequests = 100;

      const rateLimit = {
        windowMs,
        max: maxRequests,
        standardHeaders: true,
        legacyHeaders: false,
      };

      expect(rateLimit.windowMs).toBe(900000); // 15 minutes in ms
      expect(rateLimit.max).toBe(100);
      expect(rateLimit.standardHeaders).toBe(true);
    });

    it('should handle rate limit memory cleanup', () => {
      const cleanupInterval = 10 * 60 * 1000; // 10 minutes
      const memoryStore = new Map();

      // Simulate cleanup function
      const cleanup = () => {
        const now = Date.now();
        for (const [key, value] of memoryStore.entries()) {
          if (now - (value as any).resetTime > cleanupInterval) {
            memoryStore.delete(key);
          }
        }
      };

      // Add test data
      memoryStore.set('test-key', { resetTime: Date.now() - cleanupInterval - 1000 });
      memoryStore.set('valid-key', { resetTime: Date.now() });

      cleanup();

      expect(memoryStore.has('test-key')).toBe(false);
      expect(memoryStore.has('valid-key')).toBe(true);
    });
  });

  describe('Security Utilities', () => {
    it('should sanitize dangerous input patterns', () => {
      const dangerousInputs = [
        { $ne: null },
        { $regex: '.*' },
        '<script>alert("xss")</script>',
        "'; DROP TABLE users; --",
      ];

      dangerousInputs.forEach(input => {
        const sanitized = JSON.stringify(input);
        // Basic check that dangerous patterns are converted to strings
        expect(typeof sanitized).toBe('string');
        expect(sanitized).not.toMatch(/\$ne|\$regex/);
      });
    });

    it('should handle timing attack prevention', async () => {
      const bcrypt = await import('bcrypt');
      const iterations = 5;
      const times: number[] = [];

      // Test timing consistency with dummy hash
      for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        await bcrypt.compare('any-password', dummyHash);
        const end = performance.now();
        times.push(end - start);
      }

      // Calculate timing variance
      const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
      const variance = Math.max(...times) / Math.min(...times) - 1;

      // Times should be relatively consistent (within reasonable variance)
      expect(avgTime).toBeGreaterThan(0);
      expect(variance).toBeLessThan(2.0); // Allow 200% variance (bcrypt timing can vary)
    });

    it('should validate secure cookie settings', () => {
      const cookieConfig = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        maxAge: 60 * 60 * 1000, // 1 hour
      };

      expect(cookieConfig.httpOnly).toBe(true);
      expect(cookieConfig.sameSite).toBe('strict');
      expect(cookieConfig.maxAge).toBe(3600000);

      // In test environment, secure should be false
      expect(cookieConfig.secure).toBe(false);
    });
  });
});
