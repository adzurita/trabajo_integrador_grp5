package com.xplora.backend.controller;

import com.xplora.backend.entity.Feature;
import com.xplora.backend.service.implementation.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/features")
public class FeatureController {

    @Autowired
    private FeatureService featureService;

    // Obtener características de un producto
    @GetMapping("/product/{productId}")
    public List<Feature> getFeaturesByProduct(@PathVariable Long productId) {
        return featureService.getFeaturesByProduct(productId);
    }

    // Agregar una característica a un producto
    @PostMapping("/product/{productId}")
    public Feature addFeatureToProduct(@PathVariable Long productId, @RequestBody Feature feature) {
        return featureService.addFeatureToProduct(productId, feature);
    }

    // Editar una característica
    @PutMapping("/{featureId}")
    public Feature updateFeature(@PathVariable Long featureId, @RequestBody Feature featureDetails) {
        return featureService.updateFeature(featureId, featureDetails);
    }

    // Eliminar una característica
    @DeleteMapping("/{featureId}")
    public void deleteFeature(@PathVariable Long featureId) {
        featureService.deleteFeature(featureId);
    }
}

