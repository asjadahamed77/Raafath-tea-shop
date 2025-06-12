import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address."],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phone: {
      type: String,
      match: [/^\d{10}$/, "Please enter a valid phone number."],
    },
    address: {
      addressLine: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Drop the existing unique index on lastName
userSchema.index({ lastName: 1 }, { unique: false });

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
