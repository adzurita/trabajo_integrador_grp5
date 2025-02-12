package com.dh.backend.service.implementation;

import com.dh.backend.model.Product;
import com.dh.backend.repository.IProductRepository;
import com.dh.backend.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements IProductService {
    private IProductRepository iProductRepository;

    @Autowired
    public ProductServiceImpl(IProductRepository iProductRepository) {
        this.iProductRepository = iProductRepository;
    }

    @Override
    public Product save(Product product) {
        Product productSaved = iProductRepository.save(product);
        return productSaved;
    }
}
