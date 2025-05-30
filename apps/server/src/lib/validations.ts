import { z } from 'zod';

// Enhanced password validation
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password cannot exceed 128 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  );

// Enhanced username validation
const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(30, 'Username cannot exceed 30 characters')
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    'Username can only contain letters, numbers, underscores, and hyphens'
  );

// Enhanced email validation
const emailSchema = z
  .string()
  .email('Invalid email format')
  .max(254, 'Email cannot exceed 254 characters')
  .transform(email => email.toLowerCase().trim());

// User signup validation schema
export const signupSchema = z.object({
  body: z.object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    category: z.enum(['user', 'employer'], {
      errorMap: () => ({
        message: "Category must be either 'user' or 'employer'",
      }),
    }),
  }),
});

// User login validation schema - more lenient for login
export const loginSchema = z.object({
  body: z.object({
    username: z.string().min(1, 'Username is required').max(50),
    password: z.string().min(1, 'Password is required').max(128),
  }),
});

// User update validation schema
export const userUpdateSchema = z.object({
  body: z.object({
    data: z.object({
      email: emailSchema.optional(),
      name: z.string().min(1).max(50).optional(),
      surname: z.string().min(1).max(50).optional(),
      city: z.string().min(1).max(100).optional(),
      bio: z.string().max(500).optional(),
    }),
  }),
  params: z.object({
    userId: z.string().transform(val => parseInt(val, 10)),
  }),
});

// Job creation validation schema
export const jobCreateSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(100),
    description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
    categories: z.string().min(1).max(100),
    location: z.string().min(1).max(100),
    money: z.string().max(50).optional(),
    employer: z.number().int().positive(),
  }),
});

// Application creation validation schema
export const applicationSchema = z.object({
  body: z.object({
    jobId: z.number().int().positive(),
    userId: z.number().int().positive(),
  }),
});

// File upload validation
export const fileUploadSchema = z.object({
  file: z.object({
    mimetype: z.enum(['image/jpeg', 'image/png', 'image/gif', 'application/pdf']),
    size: z.number().max(10 * 1024 * 1024, 'File size cannot exceed 10MB'),
  }),
});
