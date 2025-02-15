package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Category;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.repository.CategoryRepo;
import com.ecommerce.project.repository.ProductRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    CategoryRepo categoryRepo;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    FileServiceImpl fileServiceImpl;

    @Value("${project.image}")
    private String path;

    @Override
    public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize,String sortBy,String sortOrder) {
        Sort sortByAndOrder= sortOrder.equalsIgnoreCase("asc")
                ?Sort.by(sortBy).ascending()
                :Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> productPage = productRepo.findAll(pageable);

        List<Product> products =productPage.getContent();
        if(products.isEmpty()){
            throw new APIException("No Products created till now");
        }
        List<ProductDTO> productDTOS=products.stream()
                .map(product->modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOS);
        productResponse.setPageNumber(productPage.getNumber());
        productResponse.setPageSize(productPage.getSize());
        productResponse.setTotalElements(productPage.getTotalElements());
        productResponse.setTotalPages(productPage.getTotalPages());
        productResponse.setLast(productPage.isLast());
        return productResponse;
    }

    @Override
    public ProductResponse getProductsByCategry(Long categoryId,Integer pageNumber, Integer pageSize,String sortBy,String sortOrder) {
        Category category=categoryRepo.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Category","categoryId",categoryId));
        Sort sortByAndOrder=sortOrder.equalsIgnoreCase("asc")
                ?Sort.by(sortBy).ascending()
                :Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> productPage = productRepo.findByCategory(category, pageable);
        List<Product> products=productPage.getContent();

        if(products.isEmpty()){
            throw new APIException("No Products created in this category till now");
        }
        List<ProductDTO> productDTOS=products.stream()
                .map(product -> modelMapper.map(product,ProductDTO.class))
                .collect(Collectors.toList());
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOS);
        productResponse.setPageNumber(productPage.getNumber());
        productResponse.setPageSize(productPage.getSize());
        productResponse.setTotalElements(productPage.getTotalElements());
        productResponse.setTotalPages(productPage.getTotalPages());
        productResponse.setLast(productPage.isLast());
        return productResponse;
    }

    @Override
    public ProductResponse getProductsByKeyword(String keyword,Integer pageNumber, Integer pageSize,String sortBy,String sortOrder) {
        Sort sortByAndOrder=sortOrder.equalsIgnoreCase("asc")
                ?Sort.by(sortBy).ascending()
                :Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> productPage= productRepo.findByProductNameLikeIgnoreCase("%"+keyword+"%",pageable);
        List<Product> products=productPage.getContent();

        if(products.isEmpty()){
            throw new APIException("No Products created with this keyword till now");
        }
        List<ProductDTO> productDTOS=products.stream()
                .map(product -> modelMapper.map(product,ProductDTO.class))
                .collect(Collectors.toList());
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOS);
        productResponse.setPageNumber(productPage.getNumber());
        productResponse.setPageSize(productPage.getSize());
        productResponse.setTotalElements(productPage.getTotalElements());
        productResponse.setTotalPages(productPage.getTotalPages());
        productResponse.setLast(productPage.isLast());
        return productResponse;
    }

    @Override
    public ProductDTO createProduct(long categoryId,ProductDTO productDTO) {
        Category category=categoryRepo.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Category","categoryId",categoryId));
        Product product=modelMapper.map(productDTO, Product.class);
        boolean ifProductisNotExist=true;
        List<Product> products = productRepo.findAll();
        for (int i = 0; i < products.size(); i++) {
            if (products.get(i).getProductName().equals(productDTO.getProductName())) {
                ifProductisNotExist = false;
                break;
            }
        }
        if(ifProductisNotExist){
            product.setCategory(category);
            product.setProductImage("default.png");
            double specialProductPrice=(1-product.getProductDiscount()/100)*product.getProductPrice();
            product.setSpecialProductPrice(specialProductPrice);
            Product savedProduct=productRepo.save(product);
            ProductDTO savedProductDTO=modelMapper.map(savedProduct, ProductDTO.class);
            return savedProductDTO;
        }
        else {
            throw  new APIException("Product already exists");
        }

    }

    @Override
    public ProductDTO updateProduct( long productId,ProductDTO productDTO) {
        Product product=modelMapper.map(productDTO, Product.class);
        Product productFromDb=productRepo.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("Product","productId",productId));

        productFromDb.setProductName(product.getProductName());
        productFromDb.setProductDescription(product.getProductDescription());
        productFromDb.setQuantity(product.getQuantity());
        productFromDb.setProductPrice(product.getProductPrice());
        productFromDb.setProductDiscount(product.getProductDiscount());
        double specialProductPrice=(1-product.getProductDiscount()/100)*product.getProductPrice();
        productFromDb.setSpecialProductPrice(specialProductPrice);
        Product savedProduct=productRepo.save(productFromDb);
        ProductDTO savedProductDTO=modelMapper.map(savedProduct, ProductDTO.class);
        return savedProductDTO;
    }

    @Override
    public ProductDTO updateProductImage(long productId, MultipartFile image) throws IOException {
        Product savedProductFromDb=productRepo.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("Product","productId",productId));

        String fileName=fileServiceImpl.uploadImage(path,image);
        savedProductFromDb.setProductImage(fileName);
        Product updatedProduct=productRepo.save(savedProductFromDb);
        ProductDTO updatedProductDTO=modelMapper.map(updatedProduct, ProductDTO.class);
        return updatedProductDTO;
    }

    @Override
    public ProductDTO deleteProduct(long productId) {
        Product savedPrdouct=productRepo.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("Product","productId",productId));
        ProductDTO deleteProductDTO=modelMapper.map(savedPrdouct, ProductDTO.class);
        productRepo.delete(savedPrdouct);
        return deleteProductDTO;
    }
}
