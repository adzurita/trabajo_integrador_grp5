package com.xplora.backend.repository;

import com.xplora.backend.entity.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFeatureRepository extends JpaRepository<Feature, Long> {
    // No se necesita buscar por productId porque la relación es ManyToMany
}
