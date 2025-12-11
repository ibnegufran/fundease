import mongoose from "mongoose";
import bcrypt from "bcrypt";

const organizerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    upiId: {
      type: String,
      // sirf organizer ke liye required
      required: function () {
        return this.role === "organizer";
      },
    },
    role: {
      type: String,
      enum: ["organizer", "admin"],
      default: "organizer",
    },
  },
  { timestamps: true }
);

organizerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

organizerSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Organizer =
  mongoose.models.Organizer || mongoose.model("Organizer", organizerSchema);

export default Organizer;
