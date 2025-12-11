// src/controllers/organizerController.js
import Event from "../models/Event.js";
import Payment from "../models/Payment.js";
import Organizer from "../models/Organizer.js";
import mongoose from "mongoose";
// ----------- STATS -----------
export const getOrganizerStats = async (req, res) => {
  try {
    const { organizerId } = req.params;

    // 1) fetch event ids for this organizer
    const events = await Event.find({ organizer: organizerId }).select("_id name");
    const eventIds = events.map((e) => e._id);

    const totalEvents = events.length;
    if (eventIds.length === 0) {
      return res.json({
        totalEvents: 0,
        totalPayments: 0,
        totalAmount: 0,
        verifiedPayments: 0,
        pendingPayments: 0,
        rejectedPayments: 0,
        paymentsByClass: [],
        paymentsByEvent: [],
        topStudents: [],
        recentPayments: [],
      });
    }

    // We'll run a few aggregations in parallel
    const [
      totalsAgg,
      byClass,
      byEvent,
      topStudents,
      recentPayments,
    ] = await Promise.all([
      // totals (counts + totalAmount)
      Payment.aggregate([
        { $match: { event: { $in: eventIds.map((id) => new mongoose.Types.ObjectId(id))
 } } },
        {
          $group: {
            _id: null,
            totalPayments: { $sum: 1 },
            totalAmount: { $sum: { $ifNull: ["$amount", 0] } },
            verifiedPayments: { $sum: { $cond: [{ $eq: ["$status", "Verified"] }, 1, 0] } },
            pendingPayments: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] } },
            rejectedPayments: { $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] } },
          },
        },
      ]),

      // payments grouped by className
      Payment.aggregate([
        { $match: { event: { $in: eventIds.map((id) => new mongoose.Types.ObjectId(id))
 } } },
        { $group: {
            _id: { className: "$className" },
            count: { $sum: 1 },
            totalAmount: { $sum: { $ifNull: ["$amount", 0] } },
            avgAmount: { $avg: { $ifNull: ["$amount", 0] } }
        }},
        { $project: {
            className: "$_id.className",
            count: 1,
            totalAmount: 1,
            avgAmount: { $round: ["$avgAmount", 2] },
            _id: 0
        }},
        { $sort: { count: -1, totalAmount: -1 } },
        { $limit: 10 }
      ]),

      // payments grouped by event (to show event-wise totals)
      Payment.aggregate([
        { $match: { event: { $in: eventIds.map((id) => new mongoose.Types.ObjectId(id))
 } } },
        { $group: {
            _id: "$event",
            count: { $sum: 1 },
            totalAmount: { $sum: { $ifNull: ["$amount", 0] } }
        }},
        // join event name
        { $lookup: {
            from: "events",
            localField: "_id",
            foreignField: "_id",
            as: "event"
        }},
        { $unwind: { path: "$event", preserveNullAndEmptyArrays: true }},
        { $project: {
            eventId: "$_id",
            eventName: "$event.name",
            count: 1,
            totalAmount: 1,
            _id: 0
        }},
        { $sort: { totalAmount: -1 } }
      ]),

      // top students by paid amount / count
      Payment.aggregate([
        { $match: { event: { $in: eventIds.map((id) => new mongoose.Types.ObjectId(id))
 } } },
        { $group: {
            _id: { studentName: "$studentName" },
            count: { $sum: 1 },
            totalAmount: { $sum: { $ifNull: ["$amount", 0] } }
        }},
        { $project: {
            studentName: "$_id.studentName",
            count: 1,
            totalAmount: 1,
            _id: 0
        }},
        { $sort: { totalAmount: -1, count: -1 } },
        { $limit: 10 }
      ]),

      // recent payments list (latest 10)
      Payment.aggregate([
        { $match: { event: { $in: eventIds.map((id) => new mongoose.Types.ObjectId(id))
 } } },
        { $sort: { createdAt: -1 } },
        { $limit: 10 },
        { $lookup: {
            from: "events",
            localField: "event",
            foreignField: "_id",
            as: "event"
        }},
        { $unwind: { path: "$event", preserveNullAndEmptyArrays: true }},
        { $project: {
            _id: 1,
            studentName: 1,
            rollNo: 1,
            className: 1,
            amount: 1,
            status: 1,
            note: 1,
            createdAt: 1,
            eventId: "$event._id",
            eventName: "$event.name"
        }}
      ]),
    ]);

    const totals = totalsAgg[0] || {
      totalPayments: 0,
      totalAmount: 0,
      verifiedPayments: 0,
      pendingPayments: 0,
      rejectedPayments: 0,
    };

    return res.json({
      totalEvents,
      totalPayments: totals.totalPayments,
      totalAmount: totals.totalAmount,
      verifiedPayments: totals.verifiedPayments,
      pendingPayments: totals.pendingPayments,
      rejectedPayments: totals.rejectedPayments,
      paymentsByClass: byClass,
      paymentsByEvent: byEvent,
      topStudents,
      recentPayments,
    });
  } catch (err) {
    console.error("getOrganizerStatsExtended error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------- UPDATE UPI -----------
export const updateOrganizerUpi = async (req, res) => {
  try {
    const { organizerId } = req.params;
    const { upiId } = req.body;

    if (!upiId) {
      return res.status(400).json({ message: "UPI ID is required" });
    }

    const organizer = await Organizer.findById(organizerId);
    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found" });
    }

    organizer.upiId = upiId;
    await organizer.save(); // pre-save hooks etc. handle ho jayenge

    // jo data frontend me save karna hai woh bhej do
    return res.json({
      _id: organizer._id,
      name: organizer.name,
      email: organizer.email,
      upiId: organizer.upiId,
      role: organizer.role,
    });
  } catch (err) {
    console.error("updateOrganizerUpi error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
