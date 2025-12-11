// backend/seed.js
import dotenv from "dotenv";
// import connectDB from "/src/config/db.js";
import Organizer from "./src/models/Organizer.js";
import Event from "./src/models/Event.js";
import Payment from "./src/models/Payment.js";
import connectDB from "./src/config/db.js";
import bcrypt from "bcrypt";
dotenv.config();

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const studentNames = [
  "Amit Sharma", "Sara Khan", "Rohit Patil", "Priya Verma", "Neha Joshi",
  "Karan Thakur", "Riya Mehta", "Sahil Deshmukh", "Anjali Singh",
  "Mohit Shinde", "Tanvi Kulkarni", "Harsh Patel"
];

const classes = ["FY MCA", "SY MCA", "FY MBA", "SY MBA"];

const generatePayments = (eventId) => {
  const payments = [];
  for (let i = 1; i <= 8; i++) {
    const name = getRandom(studentNames);
    payments.push({
      event: eventId,
      studentName: name,
      rollNo: `MCA-${Math.floor(Math.random() * 50 + 1)}`,
      className: getRandom(classes),
      amount: Math.floor(Math.random() * 50) + 100,
      status: getRandom(["Verified", "Pending", "Rejected"]),
      mobile: `9${Math.floor(Math.random() * 900000000 + 100000000)}`,
      note:name,
    });
  }
  return payments;
};

const seed = async () => {
  try {
    await connectDB();

    console.log("Clearing old data...");
    await Payment.deleteMany();
    await Event.deleteMany();
    await Organizer.deleteMany();

    console.log("Creating organizers...");
const plain = "password123";
const SALT_ROUNDS = 10;

  const hashed = await bcrypt.hash(plain, SALT_ROUNDS);
    const organizers = await Organizer.insertMany([
      {
        name: "Tech Coordinator",
        email: "tech@college.edu",
        password: hashed,
        upiId: "tech@ybl",
        role: "organizer",
      },
      {
        name: "Cultural Head",
        email: "cultural@college.edu",
        password: "password123",
        upiId: "culture@upi",
        role: "organizer",
      },
      {
        name: "Sports Incharge",
        email: "sports@college.edu",
        password: "password123",
        upiId: "sports@oksbi",
        role: "organizer",
      },
    ]);

    console.log("Organizers created ✔");

    // 6 EVENTS
    console.log("Creating 6 events…");

    const events = await Event.insertMany([
      {
        name: "Tech Fest 2025",
        date: new Date("2025-01-15"),
        venue: "Auditorium",
        description: "Tech competitions and project expo.",
        category: "Technical",
        minAmount: 100,
        requiredAmount: 150,
        organizerUpiId: organizers[0].upiId,
        organizer: organizers[0]._id,
        status: "Ongoing",
      },
      {
        name: "Hackathon 24H",
        date: new Date("2025-02-10"),
        venue: "Lab 1",
        description: "24-hour hackathon for developers.",
        category: "Technical",
        minAmount: 200,
        requiredAmount: 250,
        organizerUpiId: organizers[0].upiId,
        organizer: organizers[0]._id,
        status: "Upcoming",
      },
       {
        name: "class farewell",
        date: new Date("2025-02-10"),
        venue: "Lab 1",
        description: "24-hour hackathon for developers.",
        category: "Technical",
        minAmount: 200,
        requiredAmount: 250,
        organizerUpiId: organizers[0].upiId,
        organizer: organizers[0]._id,
        status: "Upcoming",
      },
       {
        name: "sports meet",
        date: new Date("2025-02-10"),
        venue: "Lab 1",
        description: "24-hour hackathon for developers.",
        category: "Technical",
        minAmount: 200,
        requiredAmount: 250,
        organizerUpiId: organizers[0].upiId,
        organizer: organizers[0]._id,
        status: "Upcoming",
      },
      {
        name: "Cultural Night",
        date: new Date("2025-03-05"),
        venue: "Open Stage",
        description: "Dance & music performances.",
        category: "Cultural",
        minAmount: 80,
        requiredAmount: 120,
        organizerUpiId: organizers[1].upiId,
        organizer: organizers[1]._id,
        status: "Upcoming",
      },
      {
        name: "Drama Competition",
        date: new Date("2025-03-20"),
        venue: "Hall B",
        description: "Inter-class drama showcase.",
        category: "Cultural",
        minAmount: 50,
        requiredAmount: 80,
        organizerUpiId: organizers[1].upiId,
        organizer: organizers[1]._id,
        status: "Ongoing",
      },
      {
        name: "Sports Day",
        date: new Date("2025-04-10"),
        venue: "Ground",
        description: "Athletics & sports.",
        category: "Sports",
        minAmount: 60,
        requiredAmount: 100,
        organizerUpiId: organizers[2].upiId,
        organizer: organizers[2]._id,
        status: "Upcoming",
      },
      {
        name: "Cricket League",
        date: new Date("2025-04-25"),
        venue: "Main Ground",
        description: "College cricket tournament.",
        category: "Sports",
        minAmount: 120,
        requiredAmount: 180,
        organizerUpiId: organizers[2].upiId,
        organizer: organizers[2]._id,
        status: "Ongoing",
      },
    ]);

    console.log("6 events created ✔");

    // Insert 8 payments for each event
    console.log("Creating 48 payments (8 per event)…");

    let allPayments = [];

    for (const ev of events) {
      const payments = generatePayments(ev._id); // 8 payments per event
      allPayments.push(...payments);
    }

    await Payment.insertMany(allPayments);

    console.log("Payments inserted ✔");
    console.log("🎉 All dummy data inserted successfully!");

    process.exit(0);
  } catch (err) {
    console.error("Seeding error ❌", err);
    process.exit(1);
  }
};

seed();
