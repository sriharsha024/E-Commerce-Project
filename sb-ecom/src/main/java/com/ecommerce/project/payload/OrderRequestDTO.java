package com.ecommerce.project.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDTO {
    private long addressId;
    private String paymentMethod;
    private String paymentGatewayName;
    private String paymentGatewayPaymentId;
    private String paymentGatewayStatus;
    private String paymentGatewayResponseMessage;

}
