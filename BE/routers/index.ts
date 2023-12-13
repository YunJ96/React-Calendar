import { Request, Response, NextFunction, Router } from 'express';
import userRouter from './userRouter';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('api router test');
  res.send("Hi! I'm router. path : /api");
});

router.use('/user', userRouter);

export default router;
