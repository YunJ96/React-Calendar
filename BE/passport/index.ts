import { PassportStatic } from 'passport';
import accessJwt from './strategies/accessJwt';
import refreshJwt from './strategies/refreshJwt';

const configurePassport = (passport: PassportStatic) => {
  passport.use('access', accessJwt);
  passport.use('refresh', refreshJwt);
};

export default configurePassport;
