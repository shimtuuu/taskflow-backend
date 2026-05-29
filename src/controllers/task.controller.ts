import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { HttpStatus } from '../lib/httpStatus';

// TODO: Day 2 — implement Kanban task CRUD with Prisma
export class TaskController {
  getAll = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(HttpStatus.OK).json({ success: true, data: [] }); } catch (e) { next(e); }
  };
  create = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(HttpStatus.CREATED).json({ success: true, data: null }); } catch (e) { next(e); }
  };
  getById = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(HttpStatus.OK).json({ success: true, data: null }); } catch (e) { next(e); }
  };
  update = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(HttpStatus.OK).json({ success: true, data: null }); } catch (e) { next(e); }
  };
  move = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(HttpStatus.OK).json({ success: true, message: 'Task moved' }); } catch (e) { next(e); }
  };
  delete = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(HttpStatus.OK).json({ success: true }); } catch (e) { next(e); }
  };
  getComments = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(HttpStatus.OK).json({ success: true, data: [] }); } catch (e) { next(e); }
  };
  addComment = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(HttpStatus.CREATED).json({ success: true, data: null }); } catch (e) { next(e); }
  };
}
