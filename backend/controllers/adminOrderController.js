import checkoutModel from '../models/checkout.js';

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await checkoutModel
      .find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
    });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await checkoutModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
    });
  }
};

// Get order statistics
export const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await checkoutModel.countDocuments();
    const pendingOrders = await checkoutModel.countDocuments({ status: 'Pending' });
    const completedOrders = await checkoutModel.countDocuments({ status: 'Completed' });
    const cancelledOrders = await checkoutModel.countDocuments({ status: 'Cancelled' });

    const totalRevenue = await checkoutModel.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    res.json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching order statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order statistics',
    });
  }
}; 