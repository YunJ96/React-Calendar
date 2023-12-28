import { Router } from 'express';
import userController from '../controller/userController';
import authAccess from '../middlewares/authAccess';
import authRefresh from '../middlewares/authRefresh';
// import { upload } from '../utils/multer';

const userRouter = Router();

// 유저 회원가입
userRouter.post('/register', userController.registerUser);
// 유저 로그인
userRouter.post('/login', userController.loginUser);
// 유저 로그아웃
userRouter.get('/logout', authAccess, userController.logoutUser);
// 유저 정보 업데이트
userRouter.patch('/update', authAccess, userController.updateUserInfo);

export default userRouter;
