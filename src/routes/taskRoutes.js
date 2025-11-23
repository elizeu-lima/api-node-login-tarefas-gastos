import { Router } from 'express';
import auth from '../middleware/auth.js';
import { createTask, listTasks } from '../controllers/taskController.js';

const router = Router();

router.post('/', auth, createTask);
router.get('/', auth, listTasks);

export default router;
