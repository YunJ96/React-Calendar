import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../../models/index.js';
import dotenv from 'dotenv';
dotenv.config();

const jwtOptions = {
  secretOrKey: process.env.REFRESHSECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const refreshJwt = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findOne(
      { id: payload.id },
      { refreshToken: 1, id: 1 }
    );
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

export default refreshJwt;
