import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        cakes: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Cake",
        },
        cards: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Card",
        },
        boxes: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Box",
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
