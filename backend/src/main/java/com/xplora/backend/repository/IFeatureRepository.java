package com.xplora.backend.repository;

import com.xplora.backend.entity.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFeatureRepository extends JpaRepository<Feature, Long> {
    List<Feature> findByProductId(Long productId);
}
