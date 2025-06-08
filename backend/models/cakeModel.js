import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema({
  cakeName: {
    type: String,
    required: true,
  },
  cakePrice: {
    type: Number,
    required: true,
  },
  cakeImage: {
    url: String,
    public_id: String,
  },
  category: {
    type: String,
  },
  itemType : {
    type: String,
    default: "Cake"
  }
});

const cakeModel = mongoose.models.Cake || mongoose.model("Cake", cakeSchema);

export default cakeModel;
