package com.nepal.tourismguide.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "experience_locations")
public class ExperienceLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 180)
    private String name;

    @Column(length = 180)
    private String location;

    @Column(length = 180)
    private String region;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url", length = 700)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "experience_id", nullable = false)
    @JsonBackReference
    private Experience experience;

    public ExperienceLocation() {}

    public ExperienceLocation(String name, String location, String region, String description, String imageUrl) {
        this.name = name;
        this.location = location;
        this.region = region;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getLocation() { return location; }
    public String getRegion() { return region; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
    public Experience getExperience() { return experience; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setLocation(String location) { this.location = location; }
    public void setRegion(String region) { this.region = region; }
    public void setDescription(String description) { this.description = description; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setExperience(Experience experience) { this.experience = experience; }
}
