package com.xplora.backend.service;

import com.xplora.backend.model.Product;

import java.util.List;

public interface IProductService {
    Product saveProduct(Product product) throws Exception;
    Product findByIdProduct(Long id);
    List<Product> findAllProducts();
    void deleteByIdProduct(Long id);
}
