import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('❌ Validation Error Details:', {
          requestBody: req.body,
          validationErrors: error.errors,
          path: req.path,
        });

        const errorMessages = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
          received: err.code === 'invalid_type' ? (err as any).received : undefined,
        }));

        return res.status(400).json({
          error: 'Validation failed',
          details: errorMessages,
          message: 'Please check the required fields and formats',
        });
      }

      console.error('❌ Unexpected validation error:', error);
      res.status(500).json({ error: 'Internal server error during validation' });
    }
  };
};
