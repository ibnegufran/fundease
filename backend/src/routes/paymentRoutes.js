import express from "express";
import {
  createPayment,
  getPaymentsByEvent,
  updatePaymentStatus,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", createPayment);
router.get("/event/:eventId", getPaymentsByEvent);
router.put("/update/:paymentId", updatePaymentStatus);
export default router;
