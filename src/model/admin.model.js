import { model, Schema } from "mongoose";

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 10,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "admin",
  },
});

const Admin = model("admin", adminSchema);

export { Admin };
