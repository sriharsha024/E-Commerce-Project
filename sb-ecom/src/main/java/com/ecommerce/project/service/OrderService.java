package com.ecommerce.project.service;

import com.ecommerce.project.payload.OrderDTO;

public interface OrderService {
    OrderDTO placeOrder(String emailId, long addressId, String paymentMethod, String paymentGatewayName, String paymentGatewayPaymentId, String paymentGatewayStatus, String paymentGatewayResponseMessage);
}
