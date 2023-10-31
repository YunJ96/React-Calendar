import accessJwt from './strategies/accessJwt';
import refreshJwt from './strategies/refreshJwt';

const configurePassport = (passport) => {
  passport.use('access', accessJwt);
  passport.use('refresh', refreshJwt);
};

export default configurePassport;
