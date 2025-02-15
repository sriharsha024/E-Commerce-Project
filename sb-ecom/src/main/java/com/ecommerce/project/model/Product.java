package com.ecommerce.project.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long productId;
    @NotBlank
    @Size(min = 3,message = "Product name should be atleast 3 characters")
    private String productName;
    private String productImage;
    @NotBlank
    @Size(min = 10,message = "Product name should be atleast 10  characters")
    private String productDescription;
    private int quantity;
    private double productPrice;
    private double productDiscount;
    private double specialProductPrice;

    @ManyToOne()
    @JoinColumn(name="category_id")
    private Category category;
}
