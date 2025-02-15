package com.ecommerce.project.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private long productId;
    private String productName;
    private String productImage;
    private String productDescription;
    private int quantity;
    private double productPrice;
    private double productDiscount;
    private double specialProductPrice;

}
