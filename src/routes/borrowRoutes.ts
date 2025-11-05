import { Router } from 'express';
import {borrowBook, getBorrowedSummary} from '../controllers/borrowController';

const router = Router();

router.post('/', borrowBook);
router.get('/', getBorrowedSummary);

export default router;