import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  cardName: {
    type: String,
    required: true,
  },
  cardPrice: {
    type: Number,
    required: true,
  },
  cardImage: {
    url: String,
    public_id: String,
  },
  itemType : {
    type: String,
    default: "Card"
  }
  
});

const cardModel = mongoose.models.Card || mongoose.model("Card", cardSchema);

export default cardModel;
