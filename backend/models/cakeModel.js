import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema(
    {
        cakeName: {
            type: String,
            required: true,
        },
        cakePrice: {
            type: Number,
            required: true,
        },
        cakeImage : {
            type: String,
            required: true,
        },
        category: {
            type: String,
        }
    }
)

const cakeModel = mongoose.models.Cake || mongoose.model("Cake", cakeSchema);

export default cakeModel;