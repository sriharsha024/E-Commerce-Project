import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';

export default function ProductViewModel({ open, setOpen, product, isAvailable }) {
  const { id: productId, productName, productDescription, productImage, quantity, price, discount, specialProductPrice } = product;

  return (
    <Dialog open={open} as="div" className="relative z-10" onClose={() => setOpen(false)}>
      <DialogBackdrop className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-lg bg-white shadow-lg p-6">
            <DialogTitle as="div" className="flex items-center justify-between text-2xl font-semibold text-gray-900">
              <span>{productName}</span>
              <span className={`ml-4 px-2 py-1 rounded text-sm font-medium ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {isAvailable ? 'In Stock' : 'Out of Stock'}
              </span>
            </DialogTitle>
            <div className="mt-4">
              <img src={productImage} alt={productName} className="w-full h-64 object-cover rounded-lg" />
            </div>
            <p className="mt-4 text-gray-700">
              {productDescription}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                {specialProductPrice ? (
                  <div className="flex flex-col">
                    <span className="text-gray-400 line-through">₹{Number(price).toFixed(2)}</span>
                    <span className="text-xl font-bold text-gray-900">₹{Number(specialProductPrice).toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="text-xl font-bold text-gray-900">₹{Number(price).toFixed(2)}</span>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-500 py-2 px-4 text-sm font-semibold text-white shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
