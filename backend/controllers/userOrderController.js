import checkoutModel from '../models/checkout.js';

// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    

    const orders = await checkoutModel
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 });



    if (!orders) {
      return res.json({
        success: true,
        orders: [],
      });
    }

    res.json({
      success: true,
      orders: orders.map(order => ({
        _id: order._id,
        userId: order.userId,
      
        items: order.items,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
    });
  }
}; 