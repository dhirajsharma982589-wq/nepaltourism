package com.nepal.tourismguide.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "regions")
public class Region {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true, length = 80)
    private String name;
    @Column(length = 500)
    private String description;
    @Column(name = "image_url", length = 500)
    private String imageUrl;
    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
    @Column(nullable = false)
    private Instant updatedAt = Instant.now();

    public Region() {}
    public Region(String name, String description, String imageUrl) { this.name = name; this.description = description; this.imageUrl = imageUrl; }
    @PreUpdate void touch() { updatedAt = Instant.now(); }
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
}
