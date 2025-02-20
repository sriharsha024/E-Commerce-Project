package com.ecommerce.project.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long paymentId;

    @OneToOne(mappedBy = "payment",cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    private Order order;

    @NotBlank
    @Size(min=4,message = "Payment method should be atleast 3 characters")
    private String paymentMethod;

    private String paymentGatewayPaymentId;
    private String paymentGatewayStatus;
    private String paymentGatewayResponseMessage;

    private String paymentGatewayName;


    public Payment(String paymentMethod, String paymentGatewayPaymentId, String paymentGatewayStatus, String paymentGatewayResponseMessage, String paymentGatewayName) {
        this.paymentMethod = paymentMethod;
        this.paymentGatewayPaymentId = paymentGatewayPaymentId;
        this.paymentGatewayStatus = paymentGatewayStatus;
        this.paymentGatewayResponseMessage = paymentGatewayResponseMessage;
        this.paymentGatewayName = paymentGatewayName;
    }
}
