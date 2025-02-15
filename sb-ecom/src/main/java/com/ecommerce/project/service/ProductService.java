package com.ecommerce.project.service;

import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductService {
    ProductResponse getAllProducts(Integer pageNumber, Integer pageSize,String sortBy,String sortOrder);
    ProductResponse getProductsByCategry(Long categoryId,Integer pageNumber, Integer pageSize,String sortBy,String sortOrder);
    ProductResponse getProductsByKeyword(String keyword,Integer pageNumber, Integer pageSize,String sortBy,String sortOrder);
    ProductDTO createProduct(long categoryId, ProductDTO productDTO);
    ProductDTO updateProduct(long productId,ProductDTO productDTO);
    ProductDTO updateProductImage(long productId, MultipartFile image) throws IOException;
    ProductDTO deleteProduct(long productId);
}
