import { Router } from 'express';
import userController from '../controller/userController';
import authAccess from '../middlewares/authAccess';
import authRefresh from '../middlewares/authRefresh';

const authRouter = Router();

authRouter.post('/', userController.loginUser);

export default authRouter;
