// backend/middleware/auth.middleware.js
import {verifyAccessToken} from '../config/jwt.js';

const authenticate = (req, res, next)=> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      ok: false,
      message: "Authorization is missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);

    // Attach user info to request
    req.user = decoded; // { id, email, iat, exp }

    next();
  } catch (err) {
    return res.status(401).json({
      ok: false,
      message: "Invalid or expired token",
    });
  }
}

export default authenticate;