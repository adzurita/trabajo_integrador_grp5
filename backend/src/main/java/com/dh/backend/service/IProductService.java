package com.dh.backend.service;

import com.dh.backend.model.Product;

public interface IProductService {
    Product saveProduct(Product product) throws Exception;
}
