import { Secret, SignOptions, sign } from 'jsonwebtoken';
import { User, IUser } from '../models/index';
import dotenv from 'dotenv';

dotenv.config();

const setUserToken = (user: IUser, isOnlyAccess: boolean) => {
  const accessPayload = {
    shortId: user.shortId,
    name: user.name,
    email: user.email,
    // profileImage: user.profileImage,
    isAdmin: user.isAdmin,
  };
  const accessOptions = { algorithm: 'HS256', expiresIn: '1h' };
  const accessToken = sign(
    accessPayload,
    process.env.ACCESS_SECRET as Secret,
    accessOptions as SignOptions
  );

  if (!isOnlyAccess) {
    const refreshPayload = {
      shortId: user.shortId,
    };
    const refreshOptions = { algorithm: 'HS256', expiresIn: '7d' };
    const refreshToken = sign(
      refreshPayload,
      process.env.REFRESH_SECRET as Secret,
      refreshOptions as SignOptions
    );
    User.updateOne(
      { shortId: refreshPayload.shortId },
      {
        refreshToken: refreshToken,
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });

    return { accessToken, refreshToken };
  } else {
    return { accessToken };
  }
};

export default setUserToken;
