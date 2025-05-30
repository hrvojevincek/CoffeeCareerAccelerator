import { Request, Response, NextFunction } from 'express';

interface SecurityEvent {
  type: 'AUTH_FAILURE' | 'RATE_LIMIT' | 'SUSPICIOUS_REQUEST' | 'ACCESS_DENIED';
  ip: string;
  userAgent: string;
  timestamp: Date;
  details: any;
}

class SecurityLogger {
  private events: SecurityEvent[] = [];
  private readonly maxEvents = 1000;

  log(event: SecurityEvent) {
    this.events.push(event);

    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    if (process.env.NODE_ENV === 'production') {
      console.log(`[SECURITY] ${event.type}:`, JSON.stringify(event));
    }
  }

  getRecentEvents(limit = 100): SecurityEvent[] {
    return this.events.slice(-limit);
  }
}

export const securityLogger = new SecurityLogger();

export const logSecurityEvent = (type: SecurityEvent['type'], details: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    securityLogger.log({
      type,
      ip: req.ip || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
      timestamp: new Date(),
      details: { ...details, path: req.path, method: req.method },
    });
    next();
  };
};
