import { Request, Response, NextFunction, Router } from 'express';
import userRouter from './userRouter';
import authRouter from './authRouter';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('api router test');
  res.send("Hi! I'm router. path : /api");
});

router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
