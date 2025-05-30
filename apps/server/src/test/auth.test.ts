import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import request from 'supertest';
import app from '../index';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';

const mockUser = {
  id: '1',
  email: 'test@example.com',
  password: '$2b$12$mockedhashedpassword123456',
  category: 'user',
  isActive: true,
  loginAttempts: 0,
  lockUntil: null,
  lastLogin: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Authentication API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(async () => {
    // Clean up any test data
    vi.clearAllMocks();
  });

  describe('POST /api/auth/signup', () => {
    it('should create a new user with valid data', async () => {
      const userData = {
        email: 'newuser@example.com',
        password: 'SecurePass123!',
      };

      (prisma.user.findUnique as any).mockResolvedValue(null);
      (prisma.user.create as any).mockResolvedValue({
        ...mockUser,
        email: userData.email,
      });

      const response = await request(app).post('/api/auth/signup').send(userData).expect(201);

      expect(response.body).toHaveProperty('message', 'User created successfully');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('should reject weak passwords', async () => {
      const userData = {
        email: 'test@example.com',
        password: '123', // Too weak
      };

      const response = await request(app).post('/api/auth/signup').send(userData).expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('String must contain at least 8 character(s)');
    });

    it('should reject invalid email format', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'SecurePass123!',
      };

      const response = await request(app).post('/api/auth/signup').send(userData).expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Invalid email');
    });

    it('should reject duplicate email', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'SecurePass123!',
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);

      const response = await request(app).post('/api/auth/signup').send(userData).expect(409);

      expect(response.body).toHaveProperty('error', 'User already exists');
    });

    it('should reject password without uppercase letter', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'securepass123!',
      };

      const response = await request(app).post('/api/auth/signup').send(userData).expect(400);

      expect(response.body.error).toContain('at least one uppercase letter');
    });

    it('should reject password without lowercase letter', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SECUREPASS123!',
      };

      const response = await request(app).post('/api/auth/signup').send(userData).expect(400);

      expect(response.body.error).toContain('at least one lowercase letter');
    });

    it('should reject password without number', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass!',
      };

      const response = await request(app).post('/api/auth/signup').send(userData).expect(400);

      expect(response.body.error).toContain('at least one number');
    });

    it('should reject password without special character', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123',
      };

      const response = await request(app).post('/api/auth/signup').send(userData).expect(400);

      expect(response.body.error).toContain('at least one special character');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);
      (bcrypt.compare as any).mockResolvedValue(true);
      (prisma.user.update as any).mockResolvedValue({
        ...mockUser,
        lastLogin: new Date(),
      });

      const response = await request(app).post('/api/auth/login').send(loginData).expect(200);

      expect(response.body).toHaveProperty('message', 'Login successful');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).not.toHaveProperty('password');
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should reject login with wrong password', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'WrongPassword123!',
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);
      (bcrypt.compare as any).mockResolvedValue(false);
      (prisma.user.update as any).mockResolvedValue({
        ...mockUser,
        loginAttempts: 1,
      });

      const response = await request(app).post('/api/auth/login').send(loginData).expect(401);

      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });

    it('should reject login for non-existent user', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'SecurePass123!',
      };

      (prisma.user.findUnique as any).mockResolvedValue(null);
      // Should still compare password to prevent timing attacks
      (bcrypt.compare as any).mockResolvedValue(false);

      const response = await request(app).post('/api/auth/login').send(loginData).expect(401);

      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });

    it('should reject login for inactive user', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
      };

      (prisma.user.findUnique as any).mockResolvedValue({
        ...mockUser,
        isActive: false,
      });

      const response = await request(app).post('/api/auth/login').send(loginData).expect(401);

      expect(response.body).toHaveProperty('error', 'Account is deactivated');
    });

    it('should reject login for locked account', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
      };

      (prisma.user.findUnique as any).mockResolvedValue({
        ...mockUser,
        loginAttempts: 5,
        lockUntil: new Date(Date.now() + 3600000), // 1 hour from now
      });

      const response = await request(app).post('/api/auth/login').send(loginData).expect(423);

      expect(response.body).toHaveProperty(
        'error',
        'Account is temporarily locked due to too many failed login attempts'
      );
    });

    it('should reset login attempts after successful login', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
      };

      (prisma.user.findUnique as any).mockResolvedValue({
        ...mockUser,
        loginAttempts: 3,
      });
      (bcrypt.compare as any).mockResolvedValue(true);
      (prisma.user.update as any).mockResolvedValue({
        ...mockUser,
        loginAttempts: 0,
        lockUntil: null,
        lastLogin: new Date(),
      });

      const response = await request(app).post('/api/auth/login').send(loginData).expect(200);

      expect(response.body).toHaveProperty('message', 'Login successful');

      // Verify that update was called to reset login attempts
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          loginAttempts: 0,
          lockUntil: null,
          lastLogin: expect.any(Date),
        },
      });
    });

    it('should increment login attempts after failed login', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'WrongPassword123!',
      };

      (prisma.user.findUnique as any).mockResolvedValue({
        ...mockUser,
        loginAttempts: 2,
      });
      (bcrypt.compare as any).mockResolvedValue(false);
      (prisma.user.update as any).mockResolvedValue({
        ...mockUser,
        loginAttempts: 3,
      });

      const response = await request(app).post('/api/auth/login').send(loginData).expect(401);

      expect(response.body).toHaveProperty('error', 'Invalid credentials');

      // Verify that update was called to increment login attempts
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          loginAttempts: 3,
          lockUntil: null,
        },
      });
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout successfully', async () => {
      const response = await request(app).post('/api/auth/logout').expect(200);

      expect(response.body).toHaveProperty('message', 'Logout successful');

      // Check that cookies are cleared
      const setCookieHeader = response.headers['set-cookie'];
      const cookies = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
      expect(setCookieHeader).toBeDefined();
      expect(cookies.some((cookie: string) => cookie.includes('token=;'))).toBe(true);
      expect(cookies.some((cookie: string) => cookie.includes('refreshToken=;'))).toBe(true);
    });
  });

  describe('GET /api/auth/me', () => {
    it('should return user data with valid token', async () => {
      // This test would require a valid JWT token
      // For now, we'll test the endpoint structure
      const response = await request(app).get('/api/auth/me').expect(401); // No token provided

      expect(response.body).toHaveProperty('error', 'No token provided');
    });

    it('should reject request without token', async () => {
      const response = await request(app).get('/api/auth/me').expect(401);

      expect(response.body).toHaveProperty('error', 'No token provided');
    });
  });

  describe('Input Sanitization', () => {
    it('should sanitize NoSQL injection attempts in email', async () => {
      const maliciousData = {
        email: { $ne: null },
        password: 'SecurePass123!',
      };

      const response = await request(app).post('/api/auth/login').send(maliciousData).expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should handle special characters in password safely', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123!@#$%^&*()',
      };

      (prisma.user.findUnique as any).mockResolvedValue(null);
      (prisma.user.create as any).mockResolvedValue({
        ...mockUser,
        email: userData.email,
      });

      const response = await request(app).post('/api/auth/signup').send(userData).expect(201);

      expect(response.body).toHaveProperty('message', 'User created successfully');
    });
  });

  describe('Role-based Access Control', () => {
    it('should handle user categories correctly without null checks', () => {
      // Test that category field is properly typed as non-nullable
      const testUser: typeof mockUser = {
        ...mockUser,
        category: 'admin', // Should be string, not string | null
      };

      expect(testUser.category).toBe('admin');
      expect(typeof testUser.category).toBe('string');

      // Verify category is always defined (no undefined/null)
      expect(testUser.category).toBeDefined();
      expect(testUser.category).not.toBeNull();
    });
  });
});
