import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    // student / sender details
    studentName: { type: String, required: true }, // payment me yehi naam dikhna chahiye
    rollNo: { type: String, required: true },
    className: { type: String, required: true },
    mobile: { type: String, required: true }, // 10 digit

    // money info
    amount: { type: Number, required: true },

    // optional extra info from student
    upiId: { type: String }, // student ka UPI, optional
    note: { type: String ,required: true}, // optional note from student
    screenshotUrl: { type: String }, // future: if upload to cloud

    // verification
    status: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      default: "Pending",
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
    },
    verifiedAt: { type: Date },
  },
  { timestamps: true }
);

// OverwriteModelError avoid
const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
