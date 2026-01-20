// backend/middleware/auth.middleware.js
import {verifyAccessToken} from '../config/jwt.js';
import AppError from '../utils/AppError.js';

const authenticate = (req, res, next)=> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new AppError("AUTHORIZATION_MISSING",401)
    )
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);

    // Attach user info to request
    req.user = decoded; // { id, email, iat, exp }

    next();
  } catch (err) {
    return next(
      new AppError("INVALID_OR_EXPIRED_TOKEN",401)
    )
  }
}

export default authenticate;