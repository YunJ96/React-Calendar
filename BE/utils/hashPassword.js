import bcrypt from 'bcrypt';

const salt = 10;

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('비밀번호 해싱 오류');
  }
};

export default hashPassword;
