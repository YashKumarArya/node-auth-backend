import crypto from "crypto";
import bcrypt from "bcrypt";
import { signAccessToken } from "../config/jwt.js";

export function generateAccessToken(payload) {
  return signAccessToken(payload);
}