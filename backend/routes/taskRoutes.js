import express from 'express';
import { getAllTasksController, createTaskController, updateTaskController, deleteTaskController, filterTaskController } from '../controllers/taskController.js';
import verifyAuthToken from '../middlewares/verifyAuthentication.js';

const router = express.Router();

// Middleware to verify authentication token for all routes
router.use(verifyAuthToken);

// Route to get all tasks
router.get('/', getAllTasksController);

// Route to create a new task
router.post('/', createTaskController);

// Route to update an existing task
router.put('/:id', updateTaskController); // Corrected to include ':id' parameter

// Route to delete a task by id
router.delete('/:id', deleteTaskController);

// Route to dfilter task
router.get('/search', filterTaskController);

export default router;