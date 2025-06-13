import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { logout } from '../redux/slices/authSlice';
import { fetchUserOrders } from '../redux/slices/orderSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(fetchUserOrders());
  }, [dispatch, user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* User Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold font-volgue">My Account</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <p className="mb-2"><span className="font-semibold">Name:</span> {user?.name}</p>
              <p className="mb-2"><span className="font-semibold">Email:</span> {user?.email}</p>
              <p className="mb-2"><span className="font-semibold">Phone:</span> {user?.phone}</p>
           
            </div>
            
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Order History</h2>
          {!orders || orders.length === 0 ? (
            <p className="text-gray-500">No orders found</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-semibold">Order ID: {order._id}</p>
                      <p className="text-sm text-gray-500">
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  
                  {/* Order Items */}
                  <div className="space-y-4">
                    {order.items && order.items.map((item, index) => (
                      <div key={index} className="border-t pt-4">
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
                            <p className="text-sm text-gray-600">
                              To: {item.cards.to} | From: {item.cards.from}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-right font-semibold">
                      Total: Rs. {order.totalAmount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
