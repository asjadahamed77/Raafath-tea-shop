import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import cardModel from "../models/cardModel.js";
import cardCartModel from "../models/cardCart.js";


// Helper to upload image to Cloudinary
const uploadToCloudinary = async (path) => {
  const result = await cloudinary.uploader.upload(path, {
    resource_type: "image",
  });
  return { url: result.secure_url, public_id: result.public_id };
};

export const addCard = async (req, res) => {
  const { cardName, cardPrice } = req.body;

  if (!cardName || !cardPrice) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const cardImage = req.file;

    let uploadedImage = null;
    if (cardImage) {
      uploadedImage = await uploadToCloudinary(cardImage.path);
      fs.unlinkSync(cardImage.path); // Remove local file after uploading
    }

    const newCard = new cardModel({
      cardName,
      cardPrice,
      cardImage: uploadedImage, // store single image object
    });

    await newCard.save();

    res.status(201).json({
      success: true,
      message: "Card added successfully",
      card: newCard,
    });
  } catch (error) {
    console.error("Error adding card:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllCards = async (req, res) => {
    try {
        const cards = await cardModel.find({});
        res.status(200).json({ success: true, cards });
    } catch (error) {
        console.error("Error fetching cards:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteCard = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Card ID is required" });
    }

    try {
        const card = await cardModel.findById(id);
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        // Delete image from Cloudinary
        if (card.cardImage && card.cardImage.public_id) {
            await cloudinary.uploader.destroy(card.cardImage.public_id);
        }

        await cardModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Card deleted successfully" });
    } catch (error) {
        console.error("Error deleting card:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



export const addCardToCart = async (req, res) => {
  try {
    const { cardId, price, quantity, to, from, message } = req.body;
 
    const userId = req.user.id;

    if (!cardId || !price || !to || !from) {
      return res.status(400).json({ message: "card and complete required fields" });
    }

    let cart = await cardCartModel.findOne({ user: userId });

    if (!cart) {
      // Create new cart
      const totalPrice = price * quantity;

      cart = new cardCartModel({
        user: userId,
        cards: [{ cardId, price, quantity, to, from, message }],
        totalPrice,
      });
    } else {
      // Check if card already exists in the cart
      const existingCardIndex = cart.cards.findIndex(card => card.cardId.toString() === cardId);

      if (existingCardIndex !== -1) {
        // Update quantity and price for existing item
        cart.cards[existingCardIndex].quantity += quantity;
      } else {
        // Add new cake to cart
        cart.cards.push({ cardId, price, quantity, to, from, message });
      }

      // Recalculate total price
      cart.totalPrice = cart.cards.reduce(
        (sum, card) => sum + card.price * card.quantity,
        0
      );
    }

    await cart.save();
    return res.status(200).json({ success: true, message: "Card added to cart", cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCartCards = async (req, res) => {
  try {
    const userId = req.query.userId; // Get userId from query params

    const cart = await cardCartModel.findOne({ user: userId }).populate('cards.cardId');

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error fetching cart cakes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};