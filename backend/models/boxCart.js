

import mongoose from "mongoose";

const boxItemSchema = new mongoose.Schema(
  {
    boxId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Box",
      required: [true, "Box ID is required."],
    },
  
    
    price: {
      type: Number,
      required: [true, "Box price is required."],
      min: [0, "Price cannot be negative."],
    },
  
   
    quantity: {
      type: Number,
      required: [true, "Box quantity is required."],
      min: [1, "Quantity must be at least 1."],
      default: 1,
    },
  },
  { _id: false }
);

const boxCartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    boxes: {
      type: [boxItemSchema],
      default: [],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required."],
      min: [0, "Total price cannot be negative."],
      default: 0,
    },
  },
  { timestamps: true }
);

const boxCartModel = mongoose.models.cartBoxes || mongoose.model("cartBoxes", boxCartSchema);

export default boxCartModel;
