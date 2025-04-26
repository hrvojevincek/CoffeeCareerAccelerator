import { z } from "zod";

// User signup validation schema
export const signupSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(5, "Username must be at least 5 characters")
      .max(20, "Username cannot exceed 20 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    category: z.enum(["user", "employer"], {
      errorMap: () => ({
        message: "Category must be either 'user' or 'employer'",
      }),
    }),
  }),
});

// User login validation schema
export const loginSchema = z.object({
  body: z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
  }),
});

// User update validation schema
export const userUpdateSchema = z.object({
  body: z.object({
    data: z.object({
      email: z.string().email("Invalid email format").optional(),
      name: z.string().optional(),
      surname: z.string().optional(),
      city: z.string().optional(),
      bio: z.string().optional(),
    }),
  }),
  params: z.object({
    userId: z.string().transform((val) => parseInt(val, 10)),
  }),
});

// Job creation validation schema
export const jobCreateSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    categories: z.string(),
    location: z.string(),
    money: z.string().optional(),
    employer: z.number(),
  }),
});

// Application creation validation schema
export const applicationSchema = z.object({
  body: z.object({
    jobId: z.number(),
    userId: z.number(),
  }),
});
