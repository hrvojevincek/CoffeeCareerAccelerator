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
