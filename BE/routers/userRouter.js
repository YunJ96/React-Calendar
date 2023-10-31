import { Router } from 'express';
import userController from '../controller/userController';
import authAccess from '../middlewares/authAccess';
import { upload } from '../utils/multer';

const userRouter = Router();

// 유저 회원가입 API
userRouter.post('/register', userController.registerUser);

export default userRouter;
