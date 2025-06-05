import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import boxModel from "../models/BoxModel.js";

// Helper to upload image to Cloudinary
const uploadToCloudinary = async (path) => {
  const result = await cloudinary.uploader.upload(path, {
    resource_type: "image",
  });
  return { url: result.secure_url, public_id: result.public_id };
};

export const addBox = async (req, res) => {
  const { boxName, boxPrice } = req.body;

  if (!boxName || !boxPrice) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const boxImage = req.file;

    let uploadedImage = null;
    if (boxImage) {
      uploadedImage = await uploadToCloudinary(boxImage.path);
      fs.unlinkSync(boxImage.path); // Remove local file after uploading
    }

    const newBox = new boxModel({
      boxName,
      boxPrice,
      boxImage: uploadedImage, // store single image object
    });

    await newBox.save();

    res.status(201).json({
      success: true,
      message: "Box added successfully",
      box: newBox,
    });
  } catch (error) {
    console.error("Error adding box:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllBoxes = async (req, res) => {
    try {
        const boxes = await boxModel.find({});
        res.status(200).json({ success: true, boxes });
    } catch (error) {
        console.error("Error fetching boxes:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteBox = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Box ID is required" });
    }

    try {
        const box = await boxModel.findById(id);
        if (!box) {
            return res.status(404).json({ message: "Cake not found" });
        }

        // Delete image from Cloudinary
        if (box.boxImage && box.boxImage.public_id) {
            await cloudinary.uploader.destroy(box.boxImage.public_id);
        }

        await boxModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Box deleted successfully" });
    } catch (error) {
        console.error("Error deleting box:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}