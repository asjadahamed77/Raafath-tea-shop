import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import { createCheckout } from "../redux/slices/checkoutSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const { checkout, loading, error } = useSelector((state) => state.checkout);


  useEffect(() => {
    dispatch(createCheckout());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!checkout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">No items in checkout</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8 mt-8 font-volgue">Checkout</h1>

      {/* Cakes Section */}
      {checkout.items.some((item) => item.type === "cake") && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cakes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checkout.items
              .filter((item) => item.type === "cake")
              .map((item) => (
                <div
                  key={item.cakes.cakeName}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h3 className="text-xl font-semibold mb-2">{item.cakes.cakeName}</h3>
                  <p className="text-gray-600">Price: Rs. {item.cakes.cakePrice}</p>
                  <p className="text-gray-600">Quantity: {item.cakes.quantity}</p>
                  <p className="text-gray-600 font-semibold mt-2">
                    Total: Rs. {item.cakes.cakePrice * item.cakes.quantity}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Boxes Section */}
      {checkout.items.some((item) => item.type === "box") && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Boxes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checkout.items
              .filter((item) => item.type === "box")
              .map((item) => (
                <div
                  key={item.boxes.boxName}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h3 className="text-xl font-semibold mb-2">{item.boxes.boxName}</h3>
                  <p className="text-gray-600">Price: Rs. {item.boxes.boxPrice}</p>
                  <p className="text-gray-600">Quantity: {item.boxes.quantity}</p>
                  <p className="text-gray-600 font-semibold mt-2">
                    Total: Rs. {item.boxes.boxPrice * item.boxes.quantity}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Cards Section */}
      {checkout.items.some((item) => item.type === "card") && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checkout.items
              .filter((item) => item.type === "card")
              .map((item) => (
                <div
                  key={item.cards.cardName}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h3 className="text-xl font-semibold mb-2">{item.cards.cardName}</h3>
                  <p className="text-gray-600">Price: Rs. {item.cards.cardPrice}</p>
                  <p className="text-gray-600">Quantity: {item.cards.quantity}</p>
                  <p className="text-gray-600 font-semibold mt-2">
                    Total: Rs. {item.cards.cardPrice * item.cards.quantity}
                  </p>
                  <div className="mt-4">
                    <p className="text-sm">
                      <span className="font-semibold">To:</span> {item.cards.to}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">From:</span>{" "}
                      {item.cards.from}
                    </p>
                    {item.cards.message && (
                      <p className="text-sm mt-2">
                        <span className="font-semibold">Message:</span>{" "}
                        {item.cards.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Total Amount */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between items-center">
          <span className="text-lg">Total Amount:</span>
          <span className="text-2xl font-bold">Rs. {checkout.totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
