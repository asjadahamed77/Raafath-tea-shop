

import mongoose from "mongoose";

const cardItemSchema = new mongoose.Schema(
  {
    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
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
    to: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    message: {
      type: String,
      
    },
  },
  { _id: false }
);

const cardCartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    cards: {
      type: [cardItemSchema],
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

const cardCartModel = mongoose.models.cartCards || mongoose.model("cartCards", cardCartSchema);

export default cardCartModel;
