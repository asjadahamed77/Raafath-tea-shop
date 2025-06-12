import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: {
      type: String
    },
    items: [
      {
        cakes: {
          cakeName: String,
          cakePrice: Number,
          quantity: Number
        },
        cards: {
          cardName: String,
          cardPrice: Number,
          to: String,
          from: String,
          message: String,
          quantity: Number
        },
        boxes: {
          boxName: String,
          boxPrice: Number,
          quantity: Number
        },
        type: {
          type: String,
          enum: ['cake', 'box', 'card'],
          required: true
        }
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const checkoutModel =
  mongoose.models.Checkout || mongoose.model("Checkout", checkoutSchema);

export default checkoutModel;
