import { Router } from "express";
import { getPublicPricing } from "../controllers/public.controller.js";

const router = Router();

router.get("/pricing", getPublicPricing);

export default router;
