import React from 'react';

const OrderSummary = ({ totalPrice, cart, address, payment }) => {
  return (
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 mt-6">
      
      {/* Left Section: Address & Order Items */}
      <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
        {/* Billing Address */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Billing Address</h2>
          <div className="text-gray-700 space-y-1">
            <p><strong>Building Name:</strong> {address?.buildingName}</p>
            <p><strong>Street Name:</strong> {address?.street}</p>
            <p><strong>City:</strong> {address?.city}</p>
            <p><strong>State:</strong> {address?.state}</p>
            <p><strong>Country:</strong> {address?.country}</p>
            <p><strong>Pincode:</strong> {address?.pincode}</p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Payment Method</h2>
          <p className="text-gray-700"><strong>Payment Method:</strong> {payment}</p>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Order Items</h2>
          <div className="space-y-4">
            {cart?.map((item) => (
              <div key={item?.productId} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg shadow">
                <img
                  src={`${import.meta.env.VITE_BACK_END_URL}/images/${item?.productImage}`}
                  alt="Product"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.productName}</p>
                  <p className="text-sm text-gray-600">
                    {item?.quantity} x ₹{item?.specialProductPrice.toFixed(2)} = 
                    <span className="font-semibold"> ₹{(item.quantity * item.specialProductPrice).toFixed(2)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section: Order Summary at the Top-Right */}
      <div className="lg:w-1/3 w-full lg:sticky top-6 self-start">
        <div className="border rounded-lg shadow-md p-6 bg-white">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Products Total</span>
              <span>₹{totalPrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (0%)</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Grand Total</span>
              <span>₹{totalPrice?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OrderSummary;
