import passport from 'passport';

const authAccess = (req, res, next) => {
  passport.authenticate('access', { session: false })(req, res, (error) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      next();
    }
  });
};

export default authAccess;
