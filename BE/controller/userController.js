import userService from '../services/userService.js';
import setUserToken from '../utils/jwt.js';
import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const userController = {
  async registerUser(req, res) {
    try {
      const { password, name, email } = req.body;
      const registeredEmail = await userService.getUserByEmail(email);
      W;
      if (registeredEmail) {
        return res.status(500).json({ error: error.message });
      }

      const user = await userService.registerUser(email, password, name);
      res
        .status(200)
        .message('회원가입이 정상적으로 이루어졌습니다.')
        .json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async loginUser(req, res) {
    try {
      const { id, password } = req.body;
      const { accessToken, refreshToken } = await userService.loginUser(
        id,
        password
      );
      res
        .status(200)
        .message('로그인에 성공하였습니다.')
        .json({ accessToken, refreshToken });
    } catch (error) {
      res.status(500).message(error.message);
    }
  },
};

export default userController;
