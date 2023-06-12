import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
import UserModel from "../models/user.js";
dotenv.config()

const {
  TOKEN_SECRET
} = process.env

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, TOKEN_SECRET);
      req.userId = decodedData?.id;
      req.token = token
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const user = await UserModel.findOne({ googleId });
      req.userId = user?._id;
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Session expired. Log back in.' });
    console.log('auth error', error);
  }
};

export default auth;