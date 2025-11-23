import { Router } from 'express';
import auth from '../middleware/auth.js';
import { 
    createExpense, 
    listExpenses, 
    updateExpense, 
    deleteExpense 
} from '../controllers/expenseController.js';

const router = Router();

router.post('/', auth, createExpense);
router.get('/', auth, listExpenses);
router.put('/:id', auth, updateExpense);
router.delete('/:id', auth, deleteExpense);

export default router;
