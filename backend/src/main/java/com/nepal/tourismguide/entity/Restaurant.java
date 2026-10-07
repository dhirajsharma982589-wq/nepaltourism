package com.nepal.tourismguide.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, unique = true, length = 180) private String name;
    @Column(nullable = false, length = 180) private String location;
    @Column(length = 160) private String cuisine;
    @Column(columnDefinition = "TEXT") private String description;
    @Column(length = 700) private String websiteUrl;
    @Column(length = 700) private String contactInformation;
    @Column(length = 700) private String mapUrl;
    @Column(length = 700) private String imageUrl;
    @Column(nullable = false) private boolean developmentData;

    protected Restaurant() {}
    public Restaurant(String name, String location, String cuisine, String description, String websiteUrl, String contactInformation, String mapUrl, String imageUrl, boolean developmentData) {
        this.name = name; this.location = location; this.cuisine = cuisine; this.description = description;
        this.websiteUrl = websiteUrl; this.contactInformation = contactInformation; this.mapUrl = mapUrl;
        this.imageUrl = imageUrl; this.developmentData = developmentData;
    }
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getLocation() { return location; }
    public String getCuisine() { return cuisine; }
    public String getDescription() { return description; }
    public String getWebsiteUrl() { return websiteUrl; }
    public String getContactInformation() { return contactInformation; }
    public String getMapUrl() { return mapUrl; }
    public String getImageUrl() { return imageUrl; }
    public boolean isDevelopmentData() { return developmentData; }
}
