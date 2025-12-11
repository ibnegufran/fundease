// src/routes/organizerRoutes.js
import express from "express";
import {
  getOrganizerStats,
  updateOrganizerUpi,
} from "../controllers/organizerController.js";

const router = express.Router();

// GET /api/organizer/stats/:organizerId
router.get("/stats/:organizerId", getOrganizerStats);

// PUT /api/organizer/update/:organizerId
router.put("/update/:organizerId", updateOrganizerUpi);

export default router;
