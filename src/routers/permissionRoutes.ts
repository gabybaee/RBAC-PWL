import { Router } from 'express';
import { listPermissions } from '../controllers/permissionController';
import { checkPermission } from '../middleware/rbacMiddleware';

const router = Router();

router.get('/', checkPermission('permission:view'), listPermissions);

export default router;