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

    // Obtener características de un producto (ManyToMany)
    public List<Feature> getFeaturesByProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isEmpty()) {
            throw new RuntimeException("Producto no encontrado");
        }
        return product.get().getFeatures();
    }

    // Agregar una característica a un producto
    public Feature addFeatureToProduct(Long productId, Feature feature) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isEmpty()) {
            throw new RuntimeException("Producto no encontrado");
        }

        Product existingProduct = product.get();
        existingProduct.getFeatures().add(feature); // Agregar la Feature a la lista de Product
        productRepository.save(existingProduct); // Guardar cambios en Product

        return featureRepository.save(feature); // Guardar Feature
    }

    // Actualizar una característica
    public Feature updateFeature(Long featureId, Feature featureDetails) {
        Feature feature = featureRepository.findById(featureId)
                .orElseThrow(() -> new RuntimeException("Característica no encontrada"));

        feature.setName(featureDetails.getName());

        return featureRepository.save(feature);
    }

    // Eliminar una característica
    public void deleteFeature(Long featureId) {
        if (!featureRepository.existsById(featureId)) {
            throw new RuntimeException("Característica no encontrada");
        }
        featureRepository.deleteById(featureId);
    }
}