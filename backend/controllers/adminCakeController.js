import cakeModel from "../models/cakeModel.js";

export const addCake = async (req,res)=>{
    const {cakeName, cakePrice, cakeImage} = req.body;
    if(!cakeName || !cakePrice || !cakeImage) {
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        const newCake = new cakeModel({
            cakeName,
            cakePrice,
            cakeImage,
            category
        });

        await newCake.save();
        res.status(201).json({message: "Cake added successfully"});
    } catch (error) {
        console.error("Error adding cake:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}