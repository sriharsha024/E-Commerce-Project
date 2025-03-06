import { Alert, AlertTitle } from '@mui/material';
import React from 'react';

const PaypalPayment = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Alert severity="warning" variant="filled" className="max-w-xs">
        <AlertTitle>Paypal Method Unavailable</AlertTitle>
        Paypal Method not implemented yet.
      </Alert>
    </div>
  );
}

export default PaypalPayment;
