import { Request, Response } from 'express';
import userService from '../services/userService';
import setUserToken from '../utils/jwt';
import { User } from '../models/index';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const userController = {
  //유저 회원가입
  async registerUser(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body;
      const registeredEmail = await userService.getUserByEmail(email);

      if (registeredEmail) {
        return res.status(500).json({ error: '이미 등록된 이메일입니다.' });
      }

      const user = await userService.registerUser(email, password, name);
      res.status(200).json({
        message: `회원가입이 정상적으로 이루어졌습니다. ${name}님 환영합니다.`,
        user,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  //유저 로그인
  async loginUser(req: Request, res: Response) {
    try {
      const { id, password } = req.body;
      const { accessToken, refreshToken } = await userService.loginUser(
        id,
        password
      );
      res.status(200).json({
        message: '로그인에 성공하였습니다.',
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default userController;
