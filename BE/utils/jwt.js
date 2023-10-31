import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/index.js';

dotenv.config();

const setUserToken = (user, isOnlyAccess) => {
  const accessPayload = {
    shortId: user.shortId,
    name: user.name,
    email: user.email,
    // profileImage: user.profileImage,
    // isAdmin: user.isAdmin,
    // isTempPassword: user.isTempPassword,
  };
  const accessOptions = { algorithm: 'HS256', expiresIn: '1h' };
  const accessToken = jwt.sign(
    accessPayload,
    process.env.ACCESSSECRET,
    accessOptions
  );

  if (!isOnlyAccess) {
    const refreshPayload = {
      shortId: user.shortId,
    };
    const refreshOptions = { algorithm: 'HS256', expiresIn: '7d' };
    const refreshToken = jwt.sign(
      refreshPayload,
      process.env.REFRESHSECRET,
      refreshOptions
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
        console.log(err);
      });

    return { accessToken, refreshToken };
  } else {
    return { accessToken };
  }
};

export default setUserToken;
