package com.xplora.backend.service.implementation;

import com.xplora.backend.entity.Feature;
import com.xplora.backend.entity.Product;
import com.xplora.backend.repository.IFeatureRepository;
import com.xplora.backend.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureService {

    @Autowired
    private IFeatureRepository featureRepository;

    @Autowired
    private IProductRepository productRepository;

    public List<Feature> getFeaturesByProduct(Long productId) {
        return featureRepository.findByProductId(productId);
    }

    public Feature addFeatureToProduct(Long productId, Feature feature) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isEmpty()) {
            throw new RuntimeException("Producto no encontrado");
        }
        feature.setProduct(product.get());
        return featureRepository.save(feature);
    }

    public Feature updateFeature(Long featureId, Feature featureDetails) {
        Feature feature = featureRepository.findById(featureId)
                .orElseThrow(() -> new RuntimeException("Característica no encontrada"));

        feature.setName(featureDetails.getName());
        feature.setValue(featureDetails.getValue());

        return featureRepository.save(feature);
    }

    public void deleteFeature(Long featureId) {
        if (!featureRepository.existsById(featureId)) {
            throw new RuntimeException("Característica no encontrada");
        }
        featureRepository.deleteById(featureId);
    }
}
