import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    date: String, // simple string for now
    venue: String,
    category: String,
    status: {
      type: String,
      enum: ["Ongoing", "Upcoming", "Closed"],
      default: "Upcoming",
    },
    defaultAmount: { type: Number},
    requiredAmount: { type: Number }, 
    organizerUpiId: { type: String, required: true },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
