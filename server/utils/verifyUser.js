import jwt from "jsonwebtoken";
import { errorhandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorhandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorhandler(401, "Unauthorized"));
    }
    req.user = user;
    //user is decoded from token.
    //In this situation, user have this
    //  "id": "12345",
    //  "iat": ******,
    //  "exp": ****** 
    // because of jwt.sign in signin function
    next();
  });
};
