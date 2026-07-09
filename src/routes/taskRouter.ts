import verifyToken from '../middleware/verify.js';
import { Router } from 'express';

import * as taskController from '../controllers/taskController.js';

const taskRouter = Router();

taskRouter.post('/create', verifyToken, taskController.createTask);
taskRouter.put('/edit/:id', verifyToken, taskController.editTask);
taskRouter.get('/', verifyToken, taskController.getTasks);

taskRouter.delete('/delete/:id', verifyToken, taskController.deleteTasks);

taskRouter.get('/:id', verifyToken, taskController.getTask);

export default taskRouter;