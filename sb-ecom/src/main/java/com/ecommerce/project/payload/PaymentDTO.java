package com.ecommerce.project.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {

    private long paymentId;
    private String paymentMethod;
    private String paymentGatewayPaymentId;
    private String paymentGatewayStatus;
    private String paymentGatewayResponseMessage;
    private String paymentGatewayName;
}
