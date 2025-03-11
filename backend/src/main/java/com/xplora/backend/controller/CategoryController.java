package com.xplora.backend.controller;

import com.xplora.backend.entity.Category;
import com.xplora.backend.entity.Product;
import com.xplora.backend.service.implementation.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryService.createCategory(
                category.getName(),
                category.getTitle(),
                category.getDescription(),
                category.getImageUrl()
        );
    }

    @PostMapping("/{productId}/assign/{categoryId}")
    public Product assignCategoryToProduct(@PathVariable Long productId, @PathVariable Long categoryId) {
        return categoryService.assignCategoryToProduct(productId, categoryId);
    }
}
