import { Router } from "express";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import {
  getUsers,
  getUserPlan,
  getPayperiods,
  createPayperiod,
  updatePayperiod,
  deletePayperiod,
  getFeatures,
  createFeature,
  updateFeature,
  deleteFeature
} from "../controllers/admin.controller.js";

const router = Router();

// Protect all admin routes
router.use(auth, isAdmin);

// Users
router.get("/users", getUsers);
router.get("/users/:id/plan", getUserPlan);

// PayPeriods
router.get("/payperiods", getPayperiods);
router.post("/payperiods", createPayperiod);
router.put("/payperiods/:id", updatePayperiod);
router.delete("/payperiods/:id", deletePayperiod);

// Features
router.get("/features", getFeatures);
router.post("/features", createFeature);
router.put("/features/:id", updateFeature);
router.delete("/features/:id", deleteFeature);

export default router;
