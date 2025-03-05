package com.xplora.backend.service;

import com.xplora.backend.entity.Product;

import java.util.List;

public interface IProductService {
    Product saveProduct(Product product) throws Exception;
    Product findByIdProduct(Long id);
    List<Product> findAllProducts();
    Product updateProduct(Product product) throws Exception;
    void deleteByIdProduct(Long id);

    List<Product> getProductsByCategory(Long categoryId);
}
