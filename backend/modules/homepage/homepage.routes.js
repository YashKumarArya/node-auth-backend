import express from "express";
import { getHomepage } from "./homepage.controller.js";

const router = express.Router();

// Public homepage API
router.get("/", getHomepage);

export default router;
