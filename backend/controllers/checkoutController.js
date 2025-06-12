import boxCartModel from "../models/boxCart.js";
import cakeCartModel from "../models/cakeCart.js";
import cardCartModel from "../models/cardCart.js";
import checkoutModel from "../models/checkout.js";

export const getCheckout = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find all carts for the user
    const [cakes, boxes, cards] = await Promise.all([
      cakeCartModel.findOne({ user: userId }),
      boxCartModel.findOne({ user: userId }),
      cardCartModel.findOne({ user: userId })
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
      items.push({
        cakes: cakes._id,
        type: 'cake'
      });
    }

    if (boxes) {
      totalAmount += boxes.totalPrice;
      items.push({
        boxes: boxes._id,
        type: 'box'
      });
    }

    if (cards) {
      totalAmount += cards.totalPrice;
      items.push({
        cards: cards._id,
        type: 'card'
      });
    }

    const checkout = new checkoutModel({
      userId,
      items,
      totalAmount,
      status: "Pending",
    });

    await checkout.save();

    res.json({
      success: true,
      message: "Checkout created successfully",
      checkout: {
        id: checkout._id,
        userId: checkout.userId,
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
