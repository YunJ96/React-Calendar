import bcrypt from 'bcrypt';
import hashPassword from '../utils/hashPassword';
import { User } from '../models/index';
import setUserToken from '../utils/jwt';

interface RegisterUser {
  (email: string, name: string, password: string): Promise<any>;
}

const registerUser: RegisterUser = async (
  email: string,
  name: string,
  password: string
) => {
  try {
    const hashedPassword = await hashPassword(password);

    const user = new User({
      email,
      name,
      password: hashedPassword,
    });

    return await user.save();
  } catch (error) {
    throw new Error(
      '회원가입에 실패했습니다. 유저 정보를 정확히 입력해주세요.'
    );
  }
};

const userService = {
  //유저 회원가입
  registerUser,
  //유저 로그인
  async loginUser(email: string, password: string) {
    const user = await User.findOne({ email }).select('+password');

    if (!user || user.password) {
      throw new Error(
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
  async getUserByEmail(email: string) {
    return User.findOne({ email }) || null;
  },

  // 모든 유저 가져오기
  async getAllUsers() {
    return User.find();
  },

  async getUserForToken(shortId: string) {
    try {
      const user = await User.findOne(
        { shortId },
        {
          _id: 1,
          shortId: 1,
          name: 1,
          email: 1,
        }
      );
      return user;
    } catch (error) {
      throw new Error('유저의 토큰을 생성하는데 실패했습니다.');
    }
  },

  async getUserRefreshToken(shortId: string) {
    try {
      const user = await User.findOne({ shortId }, 'refreshToken');
      return user;
    } catch (error) {
      throw new Error('유저의 refresh토큰을 발견하는데 실패했습니다.');
    }
  },
};

export default userService;
