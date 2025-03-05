package com.xplora.backend.controller;

import com.xplora.backend.entity.Product;
import com.xplora.backend.service.IProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private IProductService productService;

    @Autowired
    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping
    public ResponseEntity<?> save(@RequestBody Product product) {
        try {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(productService.saveProduct(product));
        } catch (Exception ex) {
            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            return ResponseEntity
                    .ok(productService.findByIdProduct(id));
        } catch (Exception ex) {
            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Product>> findAll() {
        return ResponseEntity
                .ok(productService.findAllProducts());
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @PutMapping
    public ResponseEntity<?> update(@RequestBody Product product) {
        try {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(productService.updateProduct(product));
        } catch (Exception ex) {
            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage());
        }
    }

    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            productService.deleteByIdProduct(id);
            return ResponseEntity
                    .ok("Se eliminó el producto con ID: " + id + " exitosamente.");
        } catch (Exception ex) {
            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage());
        }
    }
    // Obtener productos por categoría
    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Long categoryId) {
        return productService.getProductsByCategory(categoryId);
    }

}
