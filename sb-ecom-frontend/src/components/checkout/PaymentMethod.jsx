import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPaymentMethod, createUserCart } from '../../store/actions';

const PaymentMethod = () => {
    const { paymentMethod } = useSelector((state) => state.payment);
    const { cart, cartId } = useSelector((state) => state.carts);
    const { isLoading, errorMessage } = useSelector((state) => state.errors);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cart.length > 0 && !cartId && !errorMessage) {
            const sendCartItems = cart.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            }));
            dispatch(createUserCart(sendCartItems));
        }
    }, [dispatch, cartId, cart, errorMessage]);

    const handlePaymentChange = (method) => {
        dispatch(addPaymentMethod(method));
    };

    return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    Select Payment Method
                </h1>
                <FormControl className="w-full">
                    <FormLabel className="text-gray-700 font-medium">Payment Method</FormLabel>
                    <RadioGroup
                        name="paymentMethod"
                        value={paymentMethod || ""}
                        onChange={(e) => handlePaymentChange(e.target.value)}
                        className="space-y-2 mt-2"
                    >
                        <FormControlLabel
                            value="Stripe"
                            control={<Radio color="primary" />}
                            label="Stripe"
                            className="hover:bg-gray-100 rounded-md px-2 py-1 transition"
                        />
                        <FormControlLabel
                            value="Paypal"
                            control={<Radio color="primary" />}
                            label="Paypal"
                            className="hover:bg-gray-100 rounded-md px-2 py-1 transition"
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    );
};

export default PaymentMethod;
