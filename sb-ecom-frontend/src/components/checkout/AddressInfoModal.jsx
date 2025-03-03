import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';

const AddressInfoModal = ({ open, setOpen, children }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        
          <div className="flex justify-end p-4">
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="px-6 py-5">
            {children}
          </div>

        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AddressInfoModal;
