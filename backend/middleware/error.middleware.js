// backend/middleware/error.middleware.js
import { env } from "../config/env.js";

export function globalErrorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  // Log unexpected errors centrally
  if (!err.isOperational) {
    console.error("[UNEXPECTED ERROR]", err);
  }

  const response = {
    ok: false,
    message: err.isOperational
      ? err.message
      : "Internal server error",
  };

  if (env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}
