import React, { useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import Skeleton from "../shared/Skeleton";
import AddressInfoModal from "./AddressInfoModal";
import AddAddressForm from "./AddAddressForm";
import { useDispatch, useSelector } from "react-redux";
import AddressList from "./AddressList";
import { DeleteModal } from "./DeleteModal";
import toast from "react-hot-toast";
import { deleteUserAddress } from "../../store/actions";

const AddressInfo = ({ address }) => {
    const noAddressExist = !address || address.length === 0;
    const { isLoading, btnLoader } = useSelector((state) => state.errors);

    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const dispatch = useDispatch();

    const addNewAddressHandler = () => {
        setSelectedAddress(null);
        setOpenAddressModal(true);
    };

    const deleteAddressHandler = () => {
        if (!selectedAddress?.addressId) {
            toast.error("No address selected for deletion.");
            return;
        }

        console.log("Selected Address for Deletion:", selectedAddress);

        dispatch(deleteUserAddress({ 
            toast, 
            addressId: selectedAddress?.addressId, 
            setOpenDeleteModal 
        }));
    };

    return (
        <div className="flex flex-col items-center">
            <div className="mt-4 text-center bg-white p-6 rounded-lg shadow-md w-96">
                {noAddressExist ? (
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <FaAddressBook className="text-blue-500 text-4xl" />
                        <h1 className="text-xl font-bold">No Address Added Yet</h1>
                        <p className="text-gray-600">Please add your address to complete payment</p>
                        <button
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                            onClick={addNewAddressHandler}
                        >
                            Add Address
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-xl font-bold mb-3">Select Address</h1>
                        {isLoading ? (
                            <div className="flex justify-center">
                                <Skeleton />
                            </div>
                        ) : (
                            <>
                                <div className="p-4 border rounded-md bg-gray-100">
                                    <AddressList
                                        addresses={address} 
                                        setSelectedAddress={setSelectedAddress}
                                        setOpenAddressModal={setOpenAddressModal}
                                        setOpenDeleteModal={setOpenDeleteModal}
                                    />
                                </div>

                                {address.length > 0 && (
                                    <div className="mt-2">
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                                            onClick={addNewAddressHandler}
                                        >
                                            Add More
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Address Form Modal */}
            <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
                <AddAddressForm address={selectedAddress} setOpenAddressModal={setOpenAddressModal} />
            </AddressInfoModal>

            {/* Delete Confirmation Modal */}
            <DeleteModal
                open={openDeleteModal}
                loader={btnLoader}
                setOpen={setOpenDeleteModal}
                title="Delete Address"
                onDeleteHandler={deleteAddressHandler}
            />
        </div>
    );
};

export default AddressInfo;
