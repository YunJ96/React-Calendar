import { Router } from 'express';
import userRouter from './userRouter.js';
import authRouter from './authRouter.js';

const router = Router();

router.get('/', (req, res, next) => {
  console.log('api router test');
  res.send("Hi! I'm router. path : /api");
});

router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
