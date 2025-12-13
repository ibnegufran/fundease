import Payment from "../models/Payment.js";
import mongoose from "mongoose";
export const createPayment = async (req, res) => {
  try {
    const {
      eventId,
      studentName,
      rollNo,
      className,
      mobile,
      amount,
      upiId,
      note,
    } = req.body;

    if (
      !eventId ||
      !studentName ||
      !rollNo ||
      !className ||
      !mobile ||
      !amount
    ) {
      return res
        .status(400)
        .json({ message: "Required fields are missing." });
    }

    const payment = await Payment.create({
      event: eventId,
      studentName,
      rollNo,
      className,
      mobile,
      amount,
      upiId,
      note,
      status: "Pending",
    });

    res.status(201).json(payment);
  } catch (err) {
    console.error("createPayment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getPaymentsByEvent = async (req, res) => {
  try {
    const payments = await Payment.find({ event: req.params.eventId }).sort({
      createdAt: -1,
    });
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/paymentController.js


/**
 * PUT /api/payments/update/:paymentId
 * Body: { status: "Verified"|"Rejected", verifierId?: "<organizerId>" , comment?: "optional note" }
 */
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status, verifierId, comment } = req.body;

    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.status(400).json({ message: "Invalid payment id" });
    }

    // validate status
    const allowed = ["Pending", "Verified", "Rejected"];
    if (!status || !allowed.includes(status)) {
      return res
        .status(400)
        .json({ message: `Invalid status. Allowed: ${allowed.join(", ")}` });
    }

    // find payment
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // if status didn't change, return current document
    if (payment.status === status) {
      return res.status(200).json({ message: "No change", payment });
    }

    // apply changes
    payment.status = status;

    // record who verified (if provided)
    if (status === "Verified") {
      payment.verifiedAt = new Date();
      if (verifierId) payment.verifiedBy = verifierId;
      // if you use auth middleware and have req.user._id:
      // payment.verifiedBy = req.user?.id || verifierId || payment.verifiedBy;
    } else {
      // clearing verified metadata if moved back to Pending/Rejected
      payment.verifiedAt = undefined;
      payment.verifiedBy = undefined;
    }

    // optional admin comment (store in note or separate field)
    if (comment) {
      // append or set a verification note (you may prefer a separate field)
      payment.note = payment.note
        ? `${payment.note} | admin: ${comment}`
        : `admin: ${comment}`;
    }

    await payment.save();

    return res.json({ message: "Status updated", payment });
  } catch (err) {
    console.error("updatePaymentStatus error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
