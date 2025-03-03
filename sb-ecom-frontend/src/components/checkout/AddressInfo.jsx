import React, { useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import Skeleton from "../shared/Skeleton";
import AddressInfoModal from "./AddressInfoModal";
import AddAddressForm from "./AddAddressForm";
import { useSelector } from "react-redux";
import AddressList from "./AddressList";

const AddressInfo = ({ address }) => {
    const noAddressExist = !address || address.length === 0;
    const { isLoading } = useSelector((state) => state.errors);

    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");

    const addNewAddressHandler = () => {
        setSelectedAddress("");
        setOpenAddressModal(true);
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
                                        addresses={address} // ✅ Renamed for consistency
                                        setSelectedAddress={setSelectedAddress}
                                        setOpenAddressModal={setOpenAddressModal}
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

            <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
                <AddAddressForm address={selectedAddress} setOpenAddressModal={setOpenAddressModal} />
            </AddressInfoModal>
        </div>
    );
};

export default AddressInfo;
