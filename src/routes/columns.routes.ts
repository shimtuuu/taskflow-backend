import { Router } from 'express';
import { ColumnController } from '../controllers/column.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { createColumnSchema, updateColumnSchema, reorderColumnsSchema } from '../validators/column.validator';

const router = Router({ mergeParams: true });
const columnController = new ColumnController();

// All column routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/projects/:projectId/columns
 * @desc    Get all columns for a project (Kanban board)
 * @access  Private (project member)
 */
router.get('/', columnController.getAll);

/**
 * @route   POST /api/projects/:projectId/columns
 * @desc    Create a new column
 * @access  Private (MANAGER, ADMIN)
 */
router.post('/', validate(createColumnSchema), requireRole(['ADMIN', 'MANAGER']), columnController.create);

/**
 * @route   PUT /api/projects/:projectId/columns/:id
 * @desc    Update column (name, color)
 * @access  Private (MANAGER, ADMIN)
 */
router.put('/:id', validate(updateColumnSchema), requireRole(['ADMIN', 'MANAGER']), columnController.update);

/**
 * @route   PATCH /api/projects/:projectId/columns/reorder
 * @desc    Reorder columns (drag-and-drop)
 * @access  Private (MANAGER, ADMIN)
 */
router.patch('/reorder', validate(reorderColumnsSchema), requireRole(['ADMIN', 'MANAGER']), columnController.reorder);

/**
 * @route   DELETE /api/projects/:projectId/columns/:id
 * @desc    Delete column (and optionally reassign tasks)
 * @access  Private (ADMIN only)
 */
router.delete('/:id', requireRole(['ADMIN']), columnController.delete);

export default router;
