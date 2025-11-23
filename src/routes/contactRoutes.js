import { Router } from 'express';
import auth from '../middleware/auth.js';
import { 
    createContact, 
    listContacts, 
    updateContact, 
    deleteContact 
} from '../controllers/contactController.js';

const router = Router();

router.post('/', auth, createContact);
router.get('/', auth, listContacts);
router.put('/:id', auth, updateContact);
router.delete('/:id', auth, deleteContact);

export default router;
