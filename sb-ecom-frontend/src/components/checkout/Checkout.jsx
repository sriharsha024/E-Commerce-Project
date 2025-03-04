import { Skeleton, Step, StepLabel, Stepper } from '@mui/material';
import { useEffect, useState } from 'react';
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import { Button } from '@headlessui/react';
import toast from 'react-hot-toast';
import OrderSummary from './OrderSummary';
import PaymentMethod from './paymentMethod';
import StripePayment from './StripePayment';
import PaypalPayment from './PaypalPayment';

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const { address, selectedUserCheckoutAddress } = useSelector((state) => state.auth);
    const { isLoading, errorMessage } = useSelector((state) => state.errors);
    const { totalPrice,cart } = useSelector((state) => state.carts);
    const { paymentMethod } = useSelector((state) => state.payment);

    const steps = ["Address", "Payment Method", "Order Summary", "Payment"];

    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    const handleNext = () => {
        if (activeStep === 0 && !selectedUserCheckoutAddress) {
            toast.error("Please select the checkout address");
            return;
        }
        if (activeStep === 1 && !paymentMethod) {
            toast.error("Please select a payment method");
            return;
        }
        setActiveStep((prevStep) => prevStep + 1);
    };

    useEffect(() => {
        dispatch(getUserAddresses());
    }, [dispatch]);

    return (
        <div className="py-14 min-h-[calc(100vh-100px)] relative">
            {/* Stepper Navigation */}
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {isLoading ? (
                <div className="mt-5 space-y-3">
                    <Skeleton variant="text" width="60%" height={30} />
                    <Skeleton variant="rectangular" width="100%" height={150} />
                    <Skeleton variant="text" width="80%" height={20} />
                </div>
            ) : (
                <div className="mt-5">
                    {activeStep === 0 && <AddressInfo address={address} />}
                    {activeStep === 1 && <PaymentMethod />}
                    {activeStep === 2 && <OrderSummary totalPrice={totalPrice} cart={cart} address={selectedUserCheckoutAddress} payment={paymentMethod} />}
                    {activeStep === 3 && 
                    <>
                    {paymentMethod==="Stripe" ? (<StripePayment/>):(<PaypalPayment/>)}
                    </>
                    }
                </div>
            )}

            <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center">
                <Button
                    variant="outlined"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-md transition-all hover:shadow-xl hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Back
                </Button>

                {activeStep !== steps.length - 1 && (
                    <Button
                        variant="contained"
                        disabled={errorMessage || (activeStep === 0 && !selectedUserCheckoutAddress) || (activeStep === 1 && !paymentMethod)}
                        className={`px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md transition-all hover:bg-blue-500 disabled:opacity-50 ${
                            errorMessage || (activeStep === 0 && !selectedUserCheckoutAddress) || (activeStep === 1 && !paymentMethod) ? "opacity-60" : ""
                        }`}
                        onClick={handleNext}
                    >
                        Proceed
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Checkout;
