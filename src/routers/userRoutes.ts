import { Router } from 'express'; 
import { listUsers, storeUser, removeUser, editUser} from '../controllers/userController'; 
import { checkPermission } from '../middleware/rbacMiddleware'; 

const router = Router(); 

router.get('/', checkPermission('user:view'), listUsers); 
router.post('/', checkPermission('user:create'), storeUser); 
router.delete('/:id', checkPermission('user:delete'), removeUser); 
router.put('/:id', checkPermission('user:update'), editUser); 
export default router;