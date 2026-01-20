import AppError from "../utils/AppError.js";

export const validate =
  (schema, property = "body") =>
  (req, res, next) => {
    try {
      const parsed = schema.parse(req[property]);
      req[property] = parsed; // overwrite with validated data
      next();
    } catch (err) {
      // Zod error
      if (err.errors) {
        const message = err.errors
          .map((e) => e.message)
          .join(", ");

        return next(new AppError(message, 400));
      }

      next(err);
    }
  };
