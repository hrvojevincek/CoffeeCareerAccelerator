import { Server } from 'http';
import { JwtPayload } from 'jsonwebtoken';

interface PrismaErrorMessage {
  error: string;
}

export interface AuthenticatedUser {
  id: number;
  username: string;
  email: string;
  category: string;
  name: string | null;
  surname: string | null;
  city: string | null;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  lastLogin: Date | null;
}

declare global {
  namespace Express {
  export interface Application {
    start: () => Server;
    }

    export interface Request {
      user?: AuthenticatedUser;
    }
  }
}

interface DecodedToken extends JwtPayload {
  userId: number;
}

declare class Logger {
  error: (message: string) => void;
}

type GenericType<T> = T[];

// Now you can use this type with any other type
declare let numbers: GenericType<number>;
declare let strings: GenericType<string>;
