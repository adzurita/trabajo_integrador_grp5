package com.xplora.backend.service.implementation;

import com.xplora.backend.entity.Image;
import com.xplora.backend.entity.Product;
import com.xplora.backend.repository.IProductRepository;
import com.xplora.backend.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService {
    private IProductRepository iProductRepository;

    @Autowired
    public ProductServiceImpl(IProductRepository iProductRepository) {
        this.iProductRepository = iProductRepository;
    }

    @Override
    public Product saveProduct(Product product) throws Exception {
        String productName = product.getName();
        Optional<Product> OptionalProduct = iProductRepository.findByName(productName);

        if (OptionalProduct.isPresent()) {
            throw new Exception("El producto con nombre '" + productName + "' ya existe.");
        }

        if (product.getImageSet() == null || product.getImageSet().size() < 5) {
            throw new Exception("El producto debe tener almenos 5 imagenes.");
        }

        for (Image image : product.getImageSet()) {
            image.setProduct(product);
        }
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(product.getCreatedAt());

        return iProductRepository.save(product);
    }

    @Override
    public Product findByIdProduct(Long id) {
        return iProductRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto con ID: " + id + " no encontrado."));
    }

    @Override
    public List<Product> findAllProducts() {
        List<Product> products = iProductRepository.findAll();
        if (products.isEmpty()) {
            System.out.println("No se encontraron productos.");
        } else {
            System.out.println(products.size() + " producto(s) encontrado(s)."); // TODO: "logger"
        }
        return products;
    }

    @Override
    public Product updateProduct(Product product) throws Exception {
        Long productId = product.getId();
        Optional<Product> productFound = iProductRepository.findById(productId);

        if (productFound.isEmpty()) {
            throw new Exception("No se pudo modificar producto, ID: " + productId + " no existe.");
        }

        if (product.getImageSet() == null || product.getImageSet().size() < 5) {
            throw new Exception("El producto debe tener almenos 5 imagenes.");
        }

        for (Image image : product.getImageSet()) {
            image.setProduct(product);
        }
        product.setCreatedAt(productFound.get().getCreatedAt());
        product.setUpdatedAt(LocalDateTime.now());

        return iProductRepository.save(product);
    }

    @Override
    public void deleteByIdProduct(Long id) throws IllegalStateException {
        if (!iProductRepository.existsById(id)) {
            throw new IllegalStateException("No se pudo eliminar producto, ID: " + id + " no existe.");
        }
        // TODO: Si producto tiene usuarios (que aun no consumen por completo el product), no se debe poder eliminar
        iProductRepository.deleteById(id);
    }

    @Override
    public List<Product> getProductsByCategory(Long categoryId) {
        return List.of();
    }
}
