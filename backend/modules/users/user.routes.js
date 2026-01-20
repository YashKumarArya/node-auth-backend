// backend/modules/users/user.routes.js
import express from "express";
import authenticate from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", authenticate, (req, res) => {
  return res.status(200).json({
    ok: true,
    message: "Protected route accessed",
    user: req.user, // comes from JWT
  });
});

export default router;
