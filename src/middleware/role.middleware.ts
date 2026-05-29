import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { HttpStatus } from '../lib/httpStatus';

type AllowedRole = 'ADMIN' | 'MANAGER' | 'MEMBER';

/**
 * Middleware factory: checks if the authenticated user has one of the required roles.
 * Must be used AFTER authenticate middleware.
 */
export const requireRole =
  (roles: AllowedRole[]) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication required',
      });
      return;
    }

    if (!roles.includes(req.user.role as AllowedRole)) {
      res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(' or ')}`,
      });
      return;
    }

    next();
  };
