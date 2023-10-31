import { Router } from 'express';
import userController from '../controller/userController.js';
import authAccess from '../middlewares/authAccess.js';
import authRefresh from '../middlewares/authRefresh.js';

const authRouter = Router();

authRouter.post('/', userController.loginUser);

export default authRouter;
