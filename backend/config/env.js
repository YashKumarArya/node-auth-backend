// backend/config/env.js
import dotenv from "dotenv";


dotenv.config();

function requireEnv(key) {
  if (!process.env[key]) {
    throw new Error(`Missing required env variable: ${key}`);
  }
  return process.env[key];
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(requireEnv("PORT")),

  DB: {
    HOST: requireEnv("DB_HOST"),
    PORT: Number(requireEnv("DB_PORT")),
    USER: requireEnv("DB_USER"),
    PASSWORD: process.env.DB_PASSWORD ?? "",
    NAME: requireEnv("DB_NAME"),
  },

  JWT: {
    SECRET: requireEnv("JWT_SECRET"),
  },

  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:5173",
};
