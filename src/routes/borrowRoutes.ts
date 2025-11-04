import { Router } from 'express';
import * as borrowController from '../controllers/borrowController';

const router = Router();

router.post('/', borrowController.borrowBook);
router.get('/', borrowController.getBorrowedSummary);

export default router;