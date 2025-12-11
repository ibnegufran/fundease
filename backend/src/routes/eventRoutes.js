import express from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  getEventsByOrganizer,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/organizer/:organizerId", getEventsByOrganizer); // 👈 NEW
router.get("/:id", getEventById);
router.post("/create", createEvent);

export default router;
