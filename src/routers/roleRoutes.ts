import { Router } from 'express';
import { listRoles, storeRole } from '../controllers/roleController';

const router = Router();

// Endpoint melihat dan menambah role
router.get('/', listRoles);
router.post('/', storeRole);

export default router;