import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected Successfully");
    return db;
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
