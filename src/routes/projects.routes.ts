import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { createProjectSchema, updateProjectSchema } from '../validators/project.validator';

const router = Router();
const projectController = new ProjectController();

// All project routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/projects
 * @desc    Get all projects for the authenticated user
 * @access  Private
 */
router.get('/', projectController.getAll);

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private
 */
router.post('/', validate(createProjectSchema), projectController.create);

/**
 * @route   GET /api/projects/:id
 * @desc    Get project by ID
 * @access  Private (project member)
 */
router.get('/:id', projectController.getById);

/**
 * @route   PUT /api/projects/:id
 * @desc    Update project
 * @access  Private (ADMIN or MANAGER)
 */
router.put('/:id', validate(updateProjectSchema), requireRole(['ADMIN', 'MANAGER']), projectController.update);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Archive/delete project
 * @access  Private (ADMIN only)
 */
router.delete('/:id', requireRole(['ADMIN']), projectController.delete);

/**
 * @route   POST /api/projects/:id/members
 * @desc    Add member to project
 * @access  Private (ADMIN or MANAGER)
 */
router.post('/:id/members', requireRole(['ADMIN', 'MANAGER']), projectController.addMember);

/**
 * @route   DELETE /api/projects/:id/members/:userId
 * @desc    Remove member from project
 * @access  Private (ADMIN only)
 */
router.delete('/:id/members/:userId', requireRole(['ADMIN']), projectController.removeMember);

export default router;
