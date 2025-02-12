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

    @Lob
    private byte[] imageData;

    @Column(nullable = false)
    private String imageType;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}

