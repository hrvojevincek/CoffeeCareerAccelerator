import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import app from '../index';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const testUser = {
  id: '1',
  email: 'integration@example.com',
  password: '$2b$12$mockedhashedpassword123456',
  isActive: true,
  loginAttempts: 0,
  lockUntil: null,
  lastLogin: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Complete User Journey', () => {
    it('should complete full user registration and authentication flow', async () => {
      // Step 1: Register a new user
      const signupData = {
        email: 'journey@example.com',
        password: 'SecurePass123!',
      };

      (prisma.user.findUnique as any).mockResolvedValue(null);
      (prisma.user.create as any).mockResolvedValue({
        ...testUser,
        email: signupData.email,
      });

      const signupResponse = await request(app)
        .post('/api/auth/signup')
        .send(signupData)
        .expect(201);

      expect(signupResponse.body).toHaveProperty('message', 'User created successfully');
      expect(signupResponse.body.user.email).toBe(signupData.email);

      // Step 2: Login with the new user
      (prisma.user.findUnique as any).mockResolvedValue({
        ...testUser,
        email: signupData.email,
      });
      (bcrypt.compare as any).mockResolvedValue(true);
      (prisma.user.update as any).mockResolvedValue({
        ...testUser,
        email: signupData.email,
        lastLogin: new Date(),
      });

      const loginResponse = await request(app).post('/api/auth/login').send(signupData).expect(200);

      expect(loginResponse.body).toHaveProperty('message', 'Login successful');
      expect(loginResponse.headers['set-cookie']).toBeDefined();

      // Extract cookies for subsequent requests
      const cookies = loginResponse.headers['set-cookie'];
      const cookieArray = Array.isArray(cookies) ? cookies : [cookies];
      const tokenCookie = cookieArray.find((cookie: string) => cookie.startsWith('token='));
      const refreshTokenCookie = cookieArray.find((cookie: string) =>
        cookie.startsWith('refreshToken=')
      );

      expect(tokenCookie).toBeDefined();
      expect(refreshTokenCookie).toBeDefined();

      // Step 3: Access protected endpoint
      (prisma.user.findUnique as any).mockResolvedValue({
        ...testUser,
        email: signupData.email,
      });

      const protectedResponse = await request(app)
        .get('/api/auth/me')
        .set('Cookie', cookies)
        .expect(200);

      expect(protectedResponse.body).toHaveProperty('user');
      expect(protectedResponse.body.user.email).toBe(signupData.email);

      // Step 4: Logout
      const logoutResponse = await request(app)
        .post('/api/auth/logout')
        .set('Cookie', cookies)
        .expect(200);

      expect(logoutResponse.body).toHaveProperty('message', 'Logout successful');

      // Verify cookies are cleared
      const logoutCookies = logoutResponse.headers['set-cookie'];
      const logoutCookieArray = Array.isArray(logoutCookies) ? logoutCookies : [logoutCookies];
      expect(logoutCookieArray.some((cookie: string) => cookie.includes('token=;'))).toBe(true);
      expect(logoutCookieArray.some((cookie: string) => cookie.includes('refreshToken=;'))).toBe(
        true
      );
    });

    it('should handle account lockout after multiple failed attempts', async () => {
      const loginData = {
        email: 'lockout@example.com',
        password: 'WrongPassword123!',
      };

      // Simulate progressive login attempts
      for (let attempt = 1; attempt <= 5; attempt++) {
        (prisma.user.findUnique as any).mockResolvedValue({
          ...testUser,
          email: loginData.email,
          loginAttempts: attempt - 1,
          lockUntil: null,
        });
        (bcrypt.compare as any).mockResolvedValue(false);
        (prisma.user.update as any).mockResolvedValue({
          ...testUser,
          email: loginData.email,
          loginAttempts: attempt,
          lockUntil: attempt >= 5 ? new Date(Date.now() + 3600000) : null,
        });

        const response = await request(app).post('/api/auth/login').send(loginData);

        if (attempt < 5) {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty('error', 'Invalid credentials');
        } else {
          // Account should be locked after 5th attempt
          expect(response.status).toBe(401);
        }
      }

      // Verify account is locked
      (prisma.user.findUnique as any).mockResolvedValue({
        ...testUser,
        email: loginData.email,
        loginAttempts: 5,
        lockUntil: new Date(Date.now() + 3600000),
      });

      const lockedResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: loginData.email,
          password: 'SecurePass123!', // Even correct password should fail
        })
        .expect(423);

      expect(lockedResponse.body).toHaveProperty(
        'error',
        'Account is temporarily locked due to too many failed login attempts'
      );
    });

    it('should handle concurrent login attempts safely', async () => {
      const loginData = {
        email: 'concurrent@example.com',
        password: 'SecurePass123!',
      };

      (prisma.user.findUnique as any).mockResolvedValue(testUser);
      (bcrypt.compare as any).mockResolvedValue(true);
      (prisma.user.update as any).mockResolvedValue({
        ...testUser,
        lastLogin: new Date(),
      });

      // Make multiple concurrent login requests
      const concurrentRequests = Array(5)
        .fill(null)
        .map(() => request(app).post('/api/auth/login').send(loginData));

      const responses = await Promise.all(concurrentRequests);

      // All requests should succeed (or at least not cause errors)
      responses.forEach(response => {
        expect([200, 429]).toContain(response.status); // 200 or rate limited
      });
    });
  });

  describe('JWT Token Management', () => {
    it('should reject expired tokens', async () => {
      // Create an expired token
      const expiredToken = jwt.sign(
        { userId: testUser.id },
        process.env.JWT_SECRET!,
        { expiresIn: '-1h' } // Expired 1 hour ago
      );

      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', `token=${expiredToken}`)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Token expired');
    });

    it('should reject malformed tokens', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', 'token=invalid.token.here')
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Invalid token');
    });

    it('should reject tokens with wrong secret', async () => {
      const wrongToken = jwt.sign({ userId: testUser.id }, 'wrong-secret', { expiresIn: '1h' });

      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', `token=${wrongToken}`)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Invalid token');
    });

    it('should handle refresh token flow', async () => {
      // This test would require implementing refresh token endpoint
      // For now, we test that refresh tokens are set during login
      const loginData = {
        email: 'refresh@example.com',
        password: 'SecurePass123!',
      };

      (prisma.user.findUnique as any).mockResolvedValue(testUser);
      (bcrypt.compare as any).mockResolvedValue(true);
      (prisma.user.update as any).mockResolvedValue({
        ...testUser,
        lastLogin: new Date(),
      });

      const response = await request(app).post('/api/auth/login').send(loginData).expect(200);

      const cookies = response.headers['set-cookie'];
      const cookieArray = Array.isArray(cookies) ? cookies : [cookies];
      const refreshTokenCookie = cookieArray.find((cookie: string) =>
        cookie.startsWith('refreshToken=')
      );

      expect(refreshTokenCookie).toBeDefined();
      expect(refreshTokenCookie).toContain('HttpOnly');
      expect(refreshTokenCookie).toContain('SameSite');
    });
  });

  describe('Database Integration', () => {
    it('should handle database connection errors gracefully', async () => {
      // Mock database error
      (prisma.user.findUnique as any).mockRejectedValue(new Error('Database connection failed'));

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'SecurePass123!',
        })
        .expect(500);

      expect(response.body).toHaveProperty('error', 'Internal server error');
    });

    it('should handle database timeout errors', async () => {
      // Mock timeout error
      (prisma.user.findUnique as any).mockRejectedValue(new Error('Query timeout'));

      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'timeout@example.com',
          password: 'SecurePass123!',
        })
        .expect(500);

      expect(response.body).toHaveProperty('error', 'Internal server error');
    });
  });

  describe('Performance and Load', () => {
    it('should handle multiple rapid requests efficiently', async () => {
      const startTime = Date.now();

      // Make 10 rapid health check requests
      const requests = Array(10)
        .fill(null)
        .map(() => request(app).get('/api/health'));

      const responses = await Promise.all(requests);
      const endTime = Date.now();
      const duration = endTime - startTime;

      // All requests should succeed
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });

      // Should complete within reasonable time (adjust as needed)
      expect(duration).toBeLessThan(5000); // 5 seconds
    });

    it('should maintain rate limit state across requests', async () => {
      // Make several requests to test rate limiting persistence
      const requests = Array(3)
        .fill(null)
        .map((_, index) =>
          request(app)
            .get('/api/health')
            .expect(200)
            .then(response => {
              expect(response.headers).toHaveProperty('x-ratelimit-remaining');
              const remaining = parseInt(response.headers['x-ratelimit-remaining']);
              expect(remaining).toBeGreaterThanOrEqual(0);
              return remaining;
            })
        );

      const remainingCounts = await Promise.all(requests);

      // Remaining count should decrease or stay the same
      expect(remainingCounts[1]).toBeLessThanOrEqual(remainingCounts[0]);
      expect(remainingCounts[2]).toBeLessThanOrEqual(remainingCounts[1]);
    });
  });

  describe('Security Edge Cases', () => {
    it('should handle very long passwords safely', async () => {
      const userData = {
        email: 'longpass@example.com',
        password: 'A1!' + 'a'.repeat(1000), // Very long but valid password
      };

      (prisma.user.findUnique as any).mockResolvedValue(null);

      const response = await request(app).post('/api/auth/signup').send(userData);

      // Should handle long passwords (may reject for length or accept)
      expect([201, 400, 413]).toContain(response.status);
    });

    it('should handle unicode characters in input', async () => {
      const userData = {
        email: 'unicode@example.com',
        password: 'SecurePass123!🔒',
      };

      (prisma.user.findUnique as any).mockResolvedValue(null);
      (prisma.user.create as any).mockResolvedValue({
        ...testUser,
        email: userData.email,
      });

      const response = await request(app).post('/api/auth/signup').send(userData).expect(201);

      expect(response.body).toHaveProperty('message', 'User created successfully');
    });

    it('should handle null and undefined values safely', async () => {
      const malformedData = {
        email: null,
        password: undefined,
      };

      const response = await request(app).post('/api/auth/login').send(malformedData).expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });
});
