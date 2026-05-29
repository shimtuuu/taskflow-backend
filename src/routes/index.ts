import { Router } from 'express';
import { healthRouter } from './health.routes';
import authRouter from './auth.routes';
import projectsRouter from './projects.routes';
import tasksRouter from './tasks.routes';
import columnsRouter from './columns.routes';

export const apiRouter = Router();

// Health check (public)
apiRouter.use('/health', healthRouter);

// Auth routes
apiRouter.use('/auth', authRouter);

// Project routes
apiRouter.use('/projects', projectsRouter);

// Task routes (nested under projects)
apiRouter.use('/projects/:projectId/tasks', tasksRouter);

// Column routes (nested under projects)
apiRouter.use('/projects/:projectId/columns', columnsRouter);
