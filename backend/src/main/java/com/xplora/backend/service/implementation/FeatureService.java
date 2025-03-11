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

    // Obtener todas las características
    public List<Feature> getAllFeatures() {
        return featureRepository.findAll();
    }

    // Obtener características de un producto (ManyToMany)
    public List<Feature> getFeaturesByProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        return product.getFeatures();
    }

    // Agregar una característica a un producto
    public Feature addFeatureToProduct(Long productId, Feature feature) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        product.getFeatures().add(feature); // Agregar la Feature a la lista del Producto
        productRepository.save(product); // Guardar cambios en Product

        return featureRepository.save(feature); // Guardar Feature
    }

    // Crear una nueva característica
    public Feature createFeature(String name, String description, String iconUrl) {
        Feature feature = new Feature();
        feature.setName(name);
        feature.setDescription(description);
        feature.setIconUrl(iconUrl);

        return featureRepository.save(feature);
    }

    // Actualizar una característica (incluyendo icono)
    public Feature updateFeature(Long featureId, Feature featureDetails) {
        Feature feature = featureRepository.findById(featureId)
                .orElseThrow(() -> new RuntimeException("Característica no encontrada"));

        feature.setName(featureDetails.getName());
        feature.setDescription(featureDetails.getDescription());
        feature.setIconUrl(featureDetails.getIconUrl());

        return featureRepository.save(feature);
    }

    //  Eliminar una característica
    public void deleteFeature(Long featureId) {
        if (!featureRepository.existsById(featureId)) {
            throw new RuntimeException("Característica no encontrada");
        }
        featureRepository.deleteById(featureId);
    }
}
