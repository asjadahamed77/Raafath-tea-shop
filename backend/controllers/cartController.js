import Cart from "../models/cartModel.js";
import mongoose from "mongoose";

const upsertItemInCart = async (userId, itemId, itemType, quantity = 1) => {
    let cart = await Cart.findOne({ userId });
  
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
  
    const existingItemIndex = cart.items.findIndex(
      (item) => item.itemId.toString() === itemId && item.itemType === itemType
    );
  
    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ itemId, itemType, quantity });
    }
  
    await cart.save();
    return cart;
  };
  

  export const addCakesToCart = async (req, res) => {
    const { userId } = req.body;
    const cakes = req.body.cakes;
  
    if (!userId || !Array.isArray(cakes)) {
      return res.status(400).json({ message: 'userId and cakes array required' });
    }
  
    try {
      for (const cake of cakes) {
        await upsertItemInCart(userId, cake.itemId, 'cake', cake.quantity || 1);
      }
  
      const updatedCart = await Cart.findOne({ userId });
      res.status(200).json({ success: true, message: 'Cakes added to cart', cart: updatedCart });
    } catch (error) {
      console.error("Error adding cakes:", error);
      res.status(500).json({ message: 'Failed to add cakes to cart' });
    }
  };
  

  export const addBoxToCart = async (req, res) => {
    const { userId, itemId, quantity } = req.body;
  
    if (!userId || !itemId) {
      return res.status(400).json({ message: 'userId and itemId required' });
    }
  
    try {
      const updatedCart = await upsertItemInCart(userId, itemId, 'box', quantity || 1);
      res.status(200).json({ success: true, message: 'Box added to cart', cart: updatedCart });
    } catch (error) {
      console.error("Error adding box:", error);
      res.status(500).json({ message: 'Failed to add box to cart' });
    }
  };
  

  export const addCardToCart = async (req, res) => {
    const { userId, itemId, quantity } = req.body;
  
    if (!userId || !itemId) {
      return res.status(400).json({ message: 'userId and itemId required' });
    }
  
    try {
      const updatedCart = await upsertItemInCart(userId, itemId, 'card', quantity || 1);
      res.status(200).json({ success: true, message: 'Card added to cart', cart: updatedCart });
    } catch (error) {
      console.error("Error adding card:", error);
      res.status(500).json({ message: 'Failed to add card to cart' });
    }
  };

  export const getCart = async (req, res) => {
    const userId = req.user.id;
    
  
    try {
      const cart = await Cart.findOne({ userId })
      
  
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }
  
      res.status(200).json({ success: true, cart });
    } catch (error) {
      console.error('Error getting cart:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  