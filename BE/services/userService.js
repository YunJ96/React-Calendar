import bcrypt from 'bcrypt';
import hashPassword from '../utils/hashPassword.js';
import { User } from '../models/index.js';
import setUserToken from '../utils/jwt.js';

const userService = {
  //유저 회원가입
  async registerUser(email, name, password) {
    try {
      const hashedPassword = await hashPassword(password);

      const user = new User({
        email,
        password: hashedPassword,
        name,
      });

      return await user.save();
    } catch (error) {
      throw new Error(
        '회원가입에 실패했습니다. 유저 정보를 정확히 입력해주세요.'
      );
    }
  },
  //유저 로그인
  async loginUser(email, password) {
    const user = await User.findOne({ id }).select('+password');

    if (!user || user.password) {
      throw new error(
        '등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다.'
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error(
        '등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다.'
      );
    }

    try {
      const { accessToken, refreshToken } = await setUserToken(user, false);
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error('로그인 오류입니다. 잠시 후 다시 이용해 주세요.');
    }
  },

  // Email로 유저 가져오기
  async getUserByEmail(email) {
    return User.findOne({ email });
  },

  // 모든 유저 가져오기
  async getAllUsers() {
    return User.find();
  },
};

export default userService;
