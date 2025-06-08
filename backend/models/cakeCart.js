

import mongoose from "mongoose";

const cakeItemSchema = new mongoose.Schema(
  {
    cakeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cake",
      required: [true, "Cake ID is required."],
    },
  
    
    price: {
      type: Number,
      required: [true, "Cake price is required."],
      min: [0, "Price cannot be negative."],
    },
  
   
    quantity: {
      type: Number,
      required: [true, "Cake quantity is required."],
      min: [1, "Quantity must be at least 1."],
      default: 1,
    },
  },
  { _id: false }
);

const cakeCartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    cakes: {
      type: [cakeItemSchema],
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

const cakeCartModel = mongoose.models.cartCakes || mongoose.model("cartCakes", cakeCartSchema);

export default cakeCartModel;
