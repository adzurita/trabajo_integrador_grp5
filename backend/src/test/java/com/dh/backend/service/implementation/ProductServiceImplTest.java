package com.dh.backend.service.implementation;

import com.dh.backend.model.Image;
import com.dh.backend.model.Product;
import com.dh.backend.service.IProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Objects;

@SpringBootTest
class ProductServiceImplTest {
    private IProductService productService;

    @Autowired
    public ProductServiceImplTest(IProductService productService) {
        this.productService = productService;
    }

    @Test
    void save() {
        Product product = new Product(null, "nombre", "descripciones", 33.33d, null);

        Product productSaved = productService.save(product);

        assert(productSaved.getId() != null);
        assert(Objects.equals(productSaved.getName(), "nombre"));
    }
}