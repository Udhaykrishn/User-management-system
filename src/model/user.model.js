import { Schema, model } from "mongoose";
import { hash } from "argon2";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 4, maxLength: 10 },
});

userSchema.pre("save", async (next) => {
  if (!this.isModified("passwod")) {
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
