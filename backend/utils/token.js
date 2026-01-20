// backend/utils/token.js
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signAccessToken } from "../config/jwt.js";

export function generateRefreshTokenPlain() {
  // 40 bytes -> 80 hex chars
  return crypto.randomBytes(40).toString("hex");
}

export async function hashRefreshToken(plainToken) {
  return bcrypt.hash(plainToken, 10);
}

export async function compareRefreshToken(plainToken, hashed) {
  return bcrypt.compare(plainToken, hashed);
}

export function generateAccessToken(payload) {
  return signAccessToken(payload);
}
