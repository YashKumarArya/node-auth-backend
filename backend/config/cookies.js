import { env } from "./env.js";

export const refreshCookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
