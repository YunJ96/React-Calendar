import { PassportStatic } from 'passport';
import accessJwt from './strategies/accessJwt.js';
import refreshJwt from './strategies/refreshJwt.js';

const configurePassport = (passport: PassportStatic) => {
  passport.use('access', accessJwt);
  passport.use('refresh', refreshJwt);
};

export default configurePassport;
