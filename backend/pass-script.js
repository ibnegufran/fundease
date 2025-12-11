// scripts/hash-organizer-passwords.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Organizer from "./src/models/Organizer.js";
import connectDB from "./src/config/db.js" // path relative to script

const MONGO = process.env.MONGO_URI ;

const SALT_ROUNDS = 10;

async function run() {
 connectDB();

  

  const organizers = await Organizer.find({});
  console.log("Found", organizers.length, "organizers");

  let updated = 0;
  for (const org of organizers) {
    const pwd = org.password || "";
    // crude check: if it doesn't look like a bcrypt hash (starts with $2)
    if (!pwd.startsWith("$2")) {
      const hashed = await bcrypt.hash(pwd, SALT_ROUNDS);
      org.password = hashed;
      await org.save();
      updated++;
      console.log(`Hashed password for organizer ${org._id} (${org.email || org.name})`);
    } else {
      // already hashed
    }
  }

  console.log(`Done. Updated ${updated} organizers.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
