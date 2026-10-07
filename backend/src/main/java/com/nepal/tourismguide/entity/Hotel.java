package com.nepal.tourismguide.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "hotels")
public class Hotel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, unique = true, length = 180) private String name;
    @Column(nullable = false, length = 180) private String destination;
    @Column(columnDefinition = "TEXT") private String description;
    @Column(length = 300) private String address;
    @Column(length = 700) private String websiteUrl;
    @Column(length = 700) private String mapUrl;
    @Column(length = 700) private String imageUrl;
    @Column(nullable = false) private boolean developmentData;

    protected Hotel() {}
    public Hotel(String name, String destination, String description, String address, String websiteUrl, String mapUrl, String imageUrl, boolean developmentData) {
        this.name = name; this.destination = destination; this.description = description; this.address = address;
        this.websiteUrl = websiteUrl; this.mapUrl = mapUrl; this.imageUrl = imageUrl; this.developmentData = developmentData;
    }
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDestination() { return destination; }
    public String getDescription() { return description; }
    public String getAddress() { return address; }
    public String getWebsiteUrl() { return websiteUrl; }
    public String getMapUrl() { return mapUrl; }
    public String getImageUrl() { return imageUrl; }
    public boolean isDevelopmentData() { return developmentData; }
}
