import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { HttpStatus } from '../lib/httpStatus';

// TODO: Day 2 — implement Kanban column CRUD with Prisma
export class ColumnController {
  getAll = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(HttpStatus.OK).json({ success: true, data: [] }); } catch (e) { next(e); }
  };
  create = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(HttpStatus.CREATED).json({ success: true, data: null }); } catch (e) { next(e); }
  };
  update = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(HttpStatus.OK).json({ success: true, data: null }); } catch (e) { next(e); }
  };
  reorder = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(HttpStatus.OK).json({ success: true, message: 'Columns reordered' }); } catch (e) { next(e); }
  };
  delete = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(HttpStatus.OK).json({ success: true }); } catch (e) { next(e); }
  };
}
