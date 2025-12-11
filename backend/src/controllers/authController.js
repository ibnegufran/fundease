import jwt from "jsonwebtoken";
import Organizer from "../models/Organizer.js";

const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registerOrganizer = async (req, res) => {
  try {
    const { name, email, password, upiId,role } = req.body;

    if (!name || !email || !password || !upiId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await Organizer.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const organizer = await Organizer.create({ name, email, password, upiId ,role});

    res.status(201).json({
      _id: organizer._id,
      name: organizer.name,
      email: organizer.email,
      upiId: organizer.upiId,
      role: organizer.role || "organizer",
      token: genToken(organizer._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginOrganizer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const organizer = await Organizer.findOne({ email });
    if (!organizer || !(await organizer.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: organizer._id,
      name: organizer.name,
      email: organizer.email,
      upiId: organizer.upiId,
      token: genToken(organizer._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
