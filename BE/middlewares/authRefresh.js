import passport from 'passport';
import userService from '../services/userService.js';
import { User } from '../models/index.js';

const refreshTokenMiddleware = async (req, res, next) => {
  passport.authenticate('refresh', { session: false }, async (error, user) => {
    if (error) {
      res
        .status(500)
        .send({ message: `토큰검증 미들웨어 에러: ${error.message}` });
    } else {
      req.user = user;
      const { id } = user;
      const userRefreshToken = await userService.getUserRefreshToken(id);
      const inputRefreshToken = req.headers.authorization?.substring(7);

      if (userRefreshToken?.refreshToken === inputRefreshToken) {
        next();
      } else {
        res.status(403).send({ message: 'refresh토큰이 만료되었습니다.' });
      }
    }
  })(req, res, next);
};

export default refreshTokenMiddleware;
