package com.dh.backend.controller;

import com.dh.backend.model.Image;
import com.dh.backend.service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/images")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/{productId}/upload")
    public ResponseEntity<?> uploadImage(@PathVariable Long productId, @RequestBody String imageUrl) {
        Image image = imageService.saveImage(productId, imageUrl);
        return ResponseEntity.status(HttpStatus.CREATED).body(image);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<Image>> getImagesByProduct(@PathVariable Long productId) {
        List<Image> images = imageService.getImagesByProduct(productId);

        if (images.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(images);
    }
    @DeleteMapping("/{imageId}")
    public ResponseEntity<?> deleteImage(@PathVariable Long imageId) {
        try {
            imageService.deleteImage(imageId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}


