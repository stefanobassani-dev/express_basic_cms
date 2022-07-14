import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connect() {
  const dbUri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "";
  try {
    await mongoose.connect(dbUri);
  } catch (err: any) {
    process.exit(1);
  }
}

export default connect;
