import { Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { prisma } from '../lib/prisma';
import { HttpStatus } from '../lib/httpStatus';
import { AuthRequest } from '../middleware/auth.middleware';
import { logger } from '../lib/logger';

export class AuthController {
  /**
   * POST /api/auth/register
   */
  register = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, username, password, fullName } = req.body;

      // Check duplicates
      const existing = await prisma.user.findFirst({
        where: { OR: [{ email }, { username }] },
      });

      if (existing) {
        res.status(HttpStatus.CONFLICT).json({
          success: false,
          message: existing.email === email ? 'Email already in use' : 'Username already taken',
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, Number(env.BCRYPT_ROUNDS));

      const user = await prisma.user.create({
        data: { email, username, password: hashedPassword, fullName },
        select: { id: true, email: true, username: true, fullName: true, role: true, createdAt: true },
      });

      const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN,
      });

      logger.info('User registered', { userId: user.id, email: user.email });

      res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Registration successful',
        data: { user, token },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /api/auth/login
   */
  login = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user || !user.isActive) {
        res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Invalid credentials',
        });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Invalid credentials',
        });
        return;
      }

      const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN,
      });

      logger.info('User logged in', { userId: user.id });

      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            fullName: user.fullName,
            role: user.role,
            avatar: user.avatar,
          },
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/auth/me
   */
  me = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        select: {
          id: true, email: true, username: true, fullName: true,
          avatar: true, role: true, isActive: true, createdAt: true,
        },
      });

      res.status(HttpStatus.OK).json({
        success: true,
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /api/auth/logout
   */
  logout = async (_req: AuthRequest, res: Response): Promise<void> => {
    // JWT is stateless — client should discard the token
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Logged out successfully',
    });
  };
}
