import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { HttpStatus } from '../lib/httpStatus';

// TODO: Day 2 — implement full project CRUD with Prisma
export class ProjectController {
  getAll = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(HttpStatus.OK).json({ success: true, data: [], message: 'TODO: implement' });
    } catch (e) { next(e); }
  };

  create = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(HttpStatus.CREATED).json({ success: true, data: null, message: 'TODO: implement' });
    } catch (e) { next(e); }
  };

  getById = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(HttpStatus.OK).json({ success: true, data: null, message: 'TODO: implement' });
    } catch (e) { next(e); }
  };

  update = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(HttpStatus.OK).json({ success: true, data: null, message: 'TODO: implement' });
    } catch (e) { next(e); }
  };

  delete = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(HttpStatus.OK).json({ success: true, message: 'TODO: implement' });
    } catch (e) { next(e); }
  };

  addMember = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(HttpStatus.CREATED).json({ success: true, message: 'TODO: implement' });
    } catch (e) { next(e); }
  };

  removeMember = async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(HttpStatus.OK).json({ success: true, message: 'TODO: implement' });
    } catch (e) { next(e); }
  };
}
