import { Server } from 'http';

interface PrismaErrorMessage {
  error: string;
}

declare namespace Express {
  export interface Application {
    start: () => Server;
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
let numbers: GenericType<number>;
let strings: GenericType<string>;
