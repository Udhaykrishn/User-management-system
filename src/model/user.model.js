import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 4, maxLength: 10 },
});

const User = model("User", userSchema);

export { User };
