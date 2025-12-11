import express from "express";
import {
  createPayment,
  getPaymentsByEvent,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", createPayment);
router.get("/event/:eventId", getPaymentsByEvent);

export default router;
