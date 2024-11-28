import { Schema, model } from "mongoose";
import { hash } from "argon2";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 4, maxLength: 10 },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    this.password = await hash(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

const User = model("User", userSchema);

export { User };
