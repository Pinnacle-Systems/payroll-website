import {
  register,
  login,
  getMe,
  updateProfile,
  sendOtp,
} from "../controllers/auth.controller.js";
import auth from "../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.post("/send-otp", sendOtp);
router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getMe);
router.put("/me", auth, updateProfile);

export default router;
