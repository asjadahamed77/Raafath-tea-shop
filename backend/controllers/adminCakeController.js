import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import cakeModel from "../models/cakeModel.js";
import cakeCartModel from "../models/cakeCart.js";
import { log } from "console";

// Helper to upload image to Cloudinary
const uploadToCloudinary = async (path) => {
  const result = await cloudinary.uploader.upload(path, {
    resource_type: "image",
  });
  return { url: result.secure_url, public_id: result.public_id };
};

export const addCake = async (req, res) => {
  const { cakeName, cakePrice, category } = req.body;

  if (!cakeName || !cakePrice || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const cakeImage = req.file;

    let uploadedImage = null;
    if (cakeImage) {
      uploadedImage = await uploadToCloudinary(cakeImage.path);
      fs.unlinkSync(cakeImage.path); 
    }

    const newCake = new cakeModel({
      cakeName,
      cakePrice,
      category,
      cakeImage: uploadedImage, // store single image object
    });

    await newCake.save();

    res.status(201).json({
      success: true,
      message: "Cake added successfully",
      cake: newCake,
    });
  } catch (error) {
    console.error("Error adding cake:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllCakes = async (req, res) => {
    try {
        const cakes = await cakeModel.find({});
        res.status(200).json({ success: true, cakes });
    } catch (error) {
        console.error("Error fetching cakes:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteCake = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Cake ID is required" });
    }

    try {
        const cake = await cakeModel.findById(id);
        if (!cake) {
            return res.status(404).json({ message: "Cake not found" });
        }

        // Delete image from Cloudinary
        if (cake.cakeImage && cake.cakeImage.public_id) {
            await cloudinary.uploader.destroy(cake.cakeImage.public_id);
        }

        await cakeModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Cake deleted successfully" });
    } catch (error) {
        console.error("Error deleting cake:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}




export const addCakesToCart = async (req, res) => {
  try {
    const { cakeId, price, quantity } = req.body;
 
    const userId = req.user.id;

    if (!cakeId || !price) {
      return res.status(400).json({ message: "cakeId and price required" });
    }

    let cart = await cakeCartModel.findOne({ user: userId });

    if (!cart) {
      // Create new cart
      const totalPrice = price * quantity;

      cart = new cakeCartModel({
        user: userId,
        cakes: [{ cakeId, price, quantity }],
        totalPrice,
      });
    } else {
      // Check if cake already exists in the cart
      const existingCakeIndex = cart.cakes.findIndex(cake => cake.cakeId.toString() === cakeId);

      if (existingCakeIndex !== -1) {
        // Update quantity and price for existing item
        cart.cakes[existingCakeIndex].quantity += quantity;
      } else {
        // Add new cake to cart
        cart.cakes.push({ cakeId, price, quantity });
      }

      // Recalculate total price
      cart.totalPrice = cart.cakes.reduce(
        (sum, cake) => sum + cake.price * cake.quantity,
        0
      );
    }

    await cart.save();
    return res.status(200).json({ success: true, message: "Cake added to cart", cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
