import boxCartModel from "../models/boxCart.js";
import cakeCartModel from "../models/cakeCart.js";
import cardCartModel from "../models/cardCart.js";
import checkoutModel from "../models/checkout.js";
import userModel from "../models/userModel.js";

export const getCheckout = async (req, res) => {
  const userId = req.user.id;

  try {
    // Get user details including phone number
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all carts for the user and populate the item details
    const [cakes, boxes, cards] = await Promise.all([
      cakeCartModel.findOne({ user: userId }).populate({
        path: 'cakes.cakeId',
        select: 'cakeName cakePrice'
      }),
      boxCartModel.findOne({ user: userId }).populate({
        path: 'boxes.boxId',
        select: 'boxName boxPrice'
      }),
      cardCartModel.findOne({ user: userId }).populate({
        path: 'cards.cardId',
        select: 'cardName cardPrice'
      })
    ]);

    // Check if at least one cart exists
    if (!cakes && !boxes && !cards) {
      return res.status(404).json({ message: "No cart items found" });
    }

    // Calculate total amount from available carts
    let totalAmount = 0;
    const items = [];

    if (cakes) {
      totalAmount += cakes.totalPrice;
      // Map cake items with their details
      cakes.cakes.forEach(cake => {
        items.push({
          cakes: {
            cakeName: cake.cakeId.cakeName,
            cakePrice: cake.cakeId.cakePrice,
            quantity: cake.quantity
          },
          type: 'cake'
        });
      });
    }

    if (boxes) {
      totalAmount += boxes.totalPrice;
      // Map box items with their details
      boxes.boxes.forEach(box => {
        items.push({
          boxes: {
            boxName: box.boxId.boxName,
            boxPrice: box.boxId.boxPrice,
            quantity: box.quantity
          },
          type: 'box'
        });
      });
    }

    if (cards) {
      totalAmount += cards.totalPrice;
      // Map card items with their details
      cards.cards.forEach(card => {
        items.push({
          cards: {
            cardName: card.cardId.cardName,
            cardPrice: card.cardId.cardPrice,
            to: card.to,
            from: card.from,
            message: card.message,
            quantity: card.quantity
          },
          type: 'card'
        });
      });
    }

    const checkout = new checkoutModel({
      userId,
      items,
      totalAmount,
      phone: user.phone, // Use the phone from user model
      status: "Pending",
    });

    await checkout.save();

    res.json({
      success: true,
      message: "Checkout created successfully",
      checkout: {
        _id: checkout._id,
        userId: checkout.userId,
        phone: checkout.phone,
        items: checkout.items,
        totalAmount: checkout.totalAmount,
        status: checkout.status,
        createdAt: checkout.createdAt,
        updatedAt: checkout.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Confirm checkout
export const confirmCheckout = async (req, res) => {
  const { checkoutId } = req.params;
  const userId = req.user.id;

  try {
    

    const checkout = await checkoutModel.findOne({ _id: checkoutId, userId });

    if (!checkout) {
      return res.status(404).json({
        success: false,
        message: "Checkout not found",
      });
    }

    if (checkout.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Checkout is not in pending status",
      });
    }

    // Clear the user's carts after successful confirmation
    await Promise.all([
      cakeCartModel.findOneAndDelete({ user: userId }),
      boxCartModel.findOneAndDelete({ user: userId }),
      cardCartModel.findOneAndDelete({ user: userId }),
    ]);

    checkout.status = "Completed";
    await checkout.save();



    res.json({
      success: true,
      message: "Checkout confirmed successfully",
      checkout: {
        _id: checkout._id,
        userId: checkout.userId,
        
        items: checkout.items,
        totalAmount: checkout.totalAmount,
        status: checkout.status,
        createdAt: checkout.createdAt,
        updatedAt: checkout.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error confirming checkout:", error);
    res.status(500).json({
      success: false,
      message: "Failed to confirm checkout",
    });
  }
};

// Cancel checkout
export const cancelCheckout = async (req, res) => {
  const { checkoutId } = req.params;
  const userId = req.user.id;

  try {
   

    const checkout = await checkoutModel.findOne({ _id: checkoutId, userId });

    if (!checkout) {
      return res.status(404).json({
        success: false,
        message: "Checkout not found",
      });
    }

    if (checkout.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Checkout is not in pending status",
      });
    }

    checkout.status = "Cancelled";
    await checkout.save();

    console.log('Checkout cancelled:', checkout); // Debug log

    res.json({
      success: true,
      message: "Checkout cancelled successfully",
      checkout: {
        _id: checkout._id,
        userId: checkout.userId,
       
        items: checkout.items,
        totalAmount: checkout.totalAmount,
        status: checkout.status,
        createdAt: checkout.createdAt,
        updatedAt: checkout.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error cancelling checkout:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel checkout",
    });
  }
};
