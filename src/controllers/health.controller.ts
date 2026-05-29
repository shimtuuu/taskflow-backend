import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const healthCheck = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check DB connectivity
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      services: {
        database: 'connected',
        api: 'running',
      },
    });
  } catch {
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      services: {
        database: 'disconnected',
        api: 'running',
      },
    });
  }
};
