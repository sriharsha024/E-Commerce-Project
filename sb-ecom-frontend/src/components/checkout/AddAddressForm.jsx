import React, { useEffect } from 'react';
import InputField from '../shared/InputField';
import { useForm } from 'react-hook-form';
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addUpdateUserAddress } from '../../store/actions';

const AddAddressForm = ({ address, setOpenAddressModal }) => {
    const { btnLoader } = useSelector((state) => state.errors);
    const dispatch = useDispatch();
    
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    // Populate form fields when editing an address
    useEffect(() => {
        if (address?.addressId) {
            setValue("buildingName", address.buildingName);
            setValue("city", address.city);
            setValue("street", address.street);
            setValue("state", address.state);
            setValue("pincode", address.pincode);
            setValue("country", address.country);
        } 
    }, [address]);

    const onSaveAddressHandler = async (data) => {
        dispatch(addUpdateUserAddress(data, toast, address?.addressId, setOpenAddressModal));
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
                <FaAddressCard className="text-4xl text-blue-500" />
                <h1 className="text-2xl font-bold text-gray-800">
                    {!address?.addressId ? "Add New Address" : "Update Address"}
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSaveAddressHandler)} className="space-y-5">
                <InputField 
                    label="Building Name"
                    id="buildingName"
                    type="text"
                    placeholder="Enter building name"
                    register={register}
                    errors={errors}
                    required
                    min={5}
                    message="Building Name must be at least 5 characters"
                />

                <InputField 
                    label="Street"
                    id="street"
                    type="text"
                    placeholder="Enter your street"
                    register={register}
                    errors={errors}
                    required
                    min={5}
                    message="Street name must be at least 5 characters"
                />

                <InputField 
                    label="City"
                    id="city"
                    type="text"
                    placeholder="Enter city"
                    register={register}
                    errors={errors}
                    required
                    min={4}
                    message="City name must be at least 4 characters"
                />

                <InputField 
                    label="State"
                    id="state"
                    type="text"
                    placeholder="Enter state"
                    register={register}
                    errors={errors}
                    required
                    min={2}
                    message="State name must be at least 2 characters"
                />

                <InputField 
                    label="Country"
                    id="country"
                    type="text"
                    placeholder="Enter country"
                    register={register}
                    errors={errors}
                    required
                    min={2}
                    message="Country name must be at least 2 characters"
                />

                <InputField 
                    label="Pincode"
                    id="pincode"
                    type="text"
                    placeholder="Enter pincode"
                    register={register}
                    errors={errors}
                    required
                    min={6}
                    message="Pincode must be at least 6 characters"
                />

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg p-3 rounded-xl hover:shadow-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
                        disabled={btnLoader}
                    >
                        {btnLoader ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Saving...
                            </>
                        ) : (
                            "Save Address"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAddressForm;
