import mongoose from "mongoose";

const boxSchema = new mongoose.Schema({
  boxName: {
    type: String,
    required: true,
  },
  boxPrice: {
    type: Number,
    required: true,
  },
  boxImage: {
    url: String,
    public_id: String,
  },
  itemType : {
    type: String,
    default: "Box"
  }
 
});

const boxModel = mongoose.models.Box || mongoose.model("Box", boxSchema);

export default boxModel;
