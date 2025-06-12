import checkoutModel from '../models/checkout.js';

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await checkoutModel.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await checkoutModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    const updatedOrder = await checkoutModel.findById(orderId)
      .populate('userId', 'name email');

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: error.message });
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
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (error) {
    console.error('Error fetching order stats:', error);
    res.status(500).json({ message: error.message });
  }
}; 