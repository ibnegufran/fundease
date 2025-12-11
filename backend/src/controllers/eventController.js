// controllers/eventController.js
import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error("getEvents error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error("getEventById error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createEvent = async (req, res) => {
  try {
    const {
      name,
      description,
      date,
      venue,
      category,
      status,
      defaultAmount,
      requiredAmount,
      organizerUpiId,
      organizerId,
    } = req.body;

    const event = await Event.create({
      name,
      description,
      date,
      venue,
      category,
      status,
      defaultAmount,
      requiredAmount,
      organizerUpiId,
      organizer: organizerId, // TODO: later from auth middleware
    });

    res.status(201).json(event);
  } catch (err) {
    console.error("createEvent error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEventsByOrganizer = async (req, res) => {
  try {
    const { organizerId } = req.params;
    const events = await Event.find({ organizer: organizerId }).sort({
      createdAt: -1,
    });
    res.json(events);
  } catch (err) {
    console.error("getEventsByOrganizer error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
