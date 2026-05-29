import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createTaskSchema, updateTaskSchema, moveTaskSchema } from '../validators/task.validator';

const router = Router({ mergeParams: true });
const taskController = new TaskController();

// All task routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/projects/:projectId/tasks
 * @desc    Get all tasks for a project
 * @access  Private (project member)
 */
router.get('/', taskController.getAll);

/**
 * @route   POST /api/projects/:projectId/tasks
 * @desc    Create a new task
 * @access  Private (project member)
 */
router.post('/', validate(createTaskSchema), taskController.create);

/**
 * @route   GET /api/projects/:projectId/tasks/:id
 * @desc    Get task by ID
 * @access  Private (project member)
 */
router.get('/:id', taskController.getById);

/**
 * @route   PUT /api/projects/:projectId/tasks/:id
 * @desc    Update task
 * @access  Private (assignee, creator, MANAGER, ADMIN)
 */
router.put('/:id', validate(updateTaskSchema), taskController.update);

/**
 * @route   PATCH /api/projects/:projectId/tasks/:id/move
 * @desc    Move task to different column / reorder (Kanban drag-and-drop)
 * @access  Private (project member)
 */
router.patch('/:id/move', validate(moveTaskSchema), taskController.move);

/**
 * @route   DELETE /api/projects/:projectId/tasks/:id
 * @desc    Delete task
 * @access  Private (creator, MANAGER, ADMIN)
 */
router.delete('/:id', taskController.delete);

/**
 * @route   GET /api/projects/:projectId/tasks/:id/comments
 * @desc    Get comments for a task
 * @access  Private (project member)
 */
router.get('/:id/comments', taskController.getComments);

/**
 * @route   POST /api/projects/:projectId/tasks/:id/comments
 * @desc    Add comment to task
 * @access  Private (project member)
 */
router.post('/:id/comments', taskController.addComment);

export default router;
