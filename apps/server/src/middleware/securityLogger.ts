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

  log(event: SecurityEvent) {
    this.events.push(event);

    // In production, send to external logging service
    if (process.env.NODE_ENV === 'production') {
      console.log(`[SECURITY] ${event.type}:`, JSON.stringify(event));
      // TODO: Send to logging service (e.g., Winston, DataDog, etc.)
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
