import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const authAccess = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('access', { session: false })(
    req,
    res,
    (error: Error) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        next();
      }
    }
  );
};

export default authAccess;
