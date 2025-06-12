import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import { fetchOrders, updateOrderStatus } from '../redux/slices/orderSlice';
import { MdPerson, MdEmail, MdPhone, MdLocationOn, MdShoppingCart } from 'react-icons/md';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status: newStatus })).unwrap();
      toast.success('Order status updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update order status');
    }
  };

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="all">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredOrders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Order Header */}
            <div className="bg-gray-50 p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">Order ID: {order._id}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* User Information */}
            <div className="p-4 border-b bg-gray-50">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MdPerson className="text-primaryColor" />
                Customer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <MdPerson className="text-gray-400" />
                  <span>{order.userId?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdEmail className="text-gray-400" />
                  <span>{order.userId?.email || 'N/A'}</span>
                </div>
               

                
                {order.userId?.address && (
                  <div className="flex items-center gap-2">
                    <MdLocationOn className="text-gray-400" />
                    <span>
                      {order.userId.address.addressLine}, {order.userId.address.city}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MdShoppingCart className="text-primaryColor" />
                Order Items
              </h3>
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    {item.type === 'cake' && item.cakes && (
                      <div>
                        <p className="font-semibold">{item.cakes.cakeName}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.cakes.quantity} × Rs. {item.cakes.cakePrice}
                        </p>
                      </div>
                    )}
                    {item.type === 'box' && item.boxes && (
                      <div>
                        <p className="font-semibold">{item.boxes.boxName}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.boxes.quantity} × Rs. {item.boxes.boxPrice}
                        </p>
                      </div>
                    )}
                    {item.type === 'card' && item.cards && (
                      <div>
                        <p className="font-semibold">{item.cards.cardName}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.cards.quantity} × Rs. {item.cards.cardPrice}
                        </p>
                        <div className="mt-2 text-sm text-gray-600">
                          <p>To: {item.cards.to}</p>
                          <p>From: {item.cards.from}</p>
                          <p>Message: {item.cards.message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="p-4 bg-gray-50 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-lg font-bold">Rs. {order.totalAmount || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders; 