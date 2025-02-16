package com.dh.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "images")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;  // Ahora almacenamos la URL en lugar de los bytes

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}


