package com.xplora.backend.service.implementation;

import com.xplora.backend.entity.Category;
import com.xplora.backend.entity.Product;
import com.xplora.backend.repository.ICategoryRepository;
import com.xplora.backend.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    @Autowired
    private IProductRepository productRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(String title, String description, String imageUrl) {
        if (categoryRepository.findByTitle(title).isPresent()) { // ✅ Usa Optional correctamente
            throw new RuntimeException("La categoría ya existe");
        }

        Category category = new Category();
        category.setTitle(title);
        category.setDescription(description);
        category.setImageUrl(imageUrl);
        return categoryRepository.save(category);
    }



    public Product assignCategoryToProduct(Long productId, Long categoryId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        product.setCategory(category);
        return productRepository.save(product);
    }
}
