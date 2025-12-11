import Payment from "../models/Payment.js";

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
