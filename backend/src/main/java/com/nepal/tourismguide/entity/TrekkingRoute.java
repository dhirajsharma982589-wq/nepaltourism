package com.nepal.tourismguide.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "trekking_routes")
public class TrekkingRoute {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, unique = true, length = 180) private String name;
    @Column(length = 120) private String region;
    @Column(length = 60) private String difficulty;
    @Column(length = 100) private String duration;
    @Column(length = 160) private String startingPoint;
    @Column(length = 160) private String endingPoint;
    @Column(length = 100) private String maximumElevation;
    @Column(columnDefinition = "TEXT") private String description;
    private Double latitude;
    private Double longitude;
    @Column(length = 700) private String mapUrl;
    @Column(length = 700) private String imageUrl;
    @Column(nullable = false) private boolean developmentData;

    protected TrekkingRoute() {}
    public TrekkingRoute(String name, String region, String difficulty, String duration, String startingPoint, String endingPoint, String maximumElevation, String description, Double latitude, Double longitude, String mapUrl, String imageUrl, boolean developmentData) {
        this.name = name; this.region = region; this.difficulty = difficulty; this.duration = duration;
        this.startingPoint = startingPoint; this.endingPoint = endingPoint; this.maximumElevation = maximumElevation;
        this.description = description; this.latitude = latitude; this.longitude = longitude; this.mapUrl = mapUrl;
        this.imageUrl = imageUrl; this.developmentData = developmentData;
    }
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getRegion() { return region; }
    public String getDifficulty() { return difficulty; }
    public String getDuration() { return duration; }
    public String getStartingPoint() { return startingPoint; }
    public String getEndingPoint() { return endingPoint; }
    public String getMaximumElevation() { return maximumElevation; }
    public String getDescription() { return description; }
    public Double getLatitude() { return latitude; }
    public Double getLongitude() { return longitude; }
    public String getMapUrl() { return mapUrl; }
    public String getImageUrl() { return imageUrl; }
    public boolean isDevelopmentData() { return developmentData; }
}
