import { Router } from 'express';
import userController from '../controller/userController.js';
import authAccess from '../middlewares/authAccess.js';
// import { upload } from '../utils/multer.js';

const userRouter = Router();

// 유저 회원가입 API
userRouter.post('/register', userController.registerUser);

export default userRouter;
