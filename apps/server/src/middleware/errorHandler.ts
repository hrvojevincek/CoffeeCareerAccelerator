import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
  code?: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Error: ${err.message}`);
  if (err.stack) {
    console.error(err.stack);
  }

  // Handle specific error types
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }

  if (err.name === "UnauthorizedError" || err.message === "Unauthorized") {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }

  if (err.name === "NotFoundError" || err.message.includes("not found")) {
    return res.status(404).json({
      status: "error",
      message: err.message || "Resource not found",
    });
  }

  // Handle Prisma errors
  if (err.code) {
    if (err.code === "P2002") {
      return res.status(409).json({
        status: "error",
        message: "A record with this identifier already exists",
      });
    }
    if (err.code === "P2025") {
      return res.status(404).json({
        status: "error",
        message: "Record not found",
      });
    }
  }

  // Default status code is 500 unless specified
  const statusCode = err.status || 500;

  return res.status(statusCode).json({
    status: "error",
    message: statusCode === 500 ? "Internal Server Error" : err.message,
  });
};
