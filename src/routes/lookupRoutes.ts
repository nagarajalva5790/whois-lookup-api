import { Router } from 'express';
import { lookupData } from '../controllers/lookupController';

const router = Router();

router.post('/lookup', lookupData);

export default router;
