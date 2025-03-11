package com.xplora.backend.service.implementation;

import com.xplora.backend.entity.Category;
import com.xplora.backend.repository.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(String name) {
        if (categoryRepository.findByName(name) != null) {
            throw new RuntimeException("La categoría ya existe");
        }
        Category category = new Category();
        category.setName(name);
        return categoryRepository.save(category);
    }

    public Category assignCategoryToProduct(Long productId, Long categoryId) {
        // Implementar la lógica para asignar categoría a un producto
        return null;
    }
}
