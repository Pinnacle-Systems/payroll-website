import { Router } from "express";
import { createOrder, verifyPayment, getMyPlan } from "../controllers/payment.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/create-order", auth, createOrder);
router.post("/verify", auth, verifyPayment);
router.get("/my-plan", auth, getMyPlan);

export default router;
