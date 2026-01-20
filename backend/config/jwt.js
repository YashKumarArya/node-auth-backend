import jwt from "jsonwebtoken";
import { env } from "./env.js";

export const JWT_CONFIG = {
  ACCESS_TOKEN_EXPIRES_IN: "15m",
};

export function signAccessToken(payload) {
  return jwt.sign(payload, env.JWT.SECRET, {
    expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN,
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.JWT.SECRET);
}
