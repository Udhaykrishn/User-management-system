import { passwordHashed } from "#utility/password.utility.js";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 4},
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    this.password = await passwordHashed(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

const User = model("User", userSchema);

export { User };
