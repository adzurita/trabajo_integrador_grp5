package com.dh.backend.controller;

import com.dh.backend.model.Image;
import com.dh.backend.service.ImageService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/images")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/{productId}/upload")
    public ResponseEntity<?> uploadImage(@PathVariable Long productId, @RequestParam("file") MultipartFile file) {
        try {
            Image image = imageService.saveImage(productId, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(image);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving the image.");
        }
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<Image>> getImagesByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(imageService.getImagesByProduct(productId));
    }

    @GetMapping("/view/{imageId}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long imageId) {
        byte[] data = imageService.getImage(imageId);
        if (data != null) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "image/jpeg")
                    .body(data);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
