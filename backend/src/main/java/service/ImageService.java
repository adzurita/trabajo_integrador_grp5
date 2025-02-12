package com.dh.backend.service;

import com.dh.backend.model.Image;
import com.dh.backend.model.Product;
import com.dh.backend.repository.ImageRepository;
import com.dh.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
    private final ImageRepository imageRepository;
    private final ProductRepository productRepository;

    public ImageService(ImageRepository imageRepository, ProductRepository productRepository) {
        this.imageRepository = imageRepository;
        this.productRepository = productRepository;
    }

    public Image saveImage(Long productId, MultipartFile file) throws IOException {
        Optional<Product> productOptional = productRepository.findById(productId);

        if (productOptional.isEmpty()) {
            throw new RuntimeException("Product not found");
        }

        Image image = new Image();
        image.setProduct(productOptional.get());
        image.setImageData(file.getBytes());
        image.setImageType(file.getContentType());

        return imageRepository.save(image);
    }

    public List<Image> getImagesByProduct(Long productId) {
        return imageRepository.findByProductId(productId);
    }

    public byte[] getImage(Long imageId) {
        Optional<Image> imageOptional = imageRepository.findById(imageId);
        return imageOptional.map(Image::getImageData).orElse(null);
    }
}
