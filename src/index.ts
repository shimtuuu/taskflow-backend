import 'dotenv/config';
import app from './app';
import { prisma } from './config/prisma';
import { logger } from './config/logger';

const PORT = process.env.PORT || 3000;

async function bootstrap(): Promise<void> {
  try {
    await prisma.$connect();
    logger.info('✅ Connected to PostgreSQL via Prisma');

    app.listen(PORT, () => {
      logger.info(`🚀 TaskFlow API running on http://localhost:${PORT}`);
      logger.info(`📊 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

bootstrap();
