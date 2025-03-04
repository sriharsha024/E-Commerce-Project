import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const PaypalPayment = () => {
  return (
    <div>
        <Alert severity="warning" variant='filled' style={{maxWidth:"400px"}}>
            <AlertTitle>Paypal Method Unavailable</AlertTitle>
                Paypal Method not implemented yet.
        </Alert>
    </div>
  )
}

export default PaypalPayment