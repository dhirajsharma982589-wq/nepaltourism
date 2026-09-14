package com.nepal.tourismguide.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "experiences")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 180)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 180)
    private String location;

    @Column(length = 40)
    private String difficulty;

    @Column(length = 80)
    private String duration;

    @Column(name = "estimated_cost", length = 100)
    private String estimatedCost;

    @Column(name = "best_season", length = 100)
    private String bestSeason;

    @Column(name = "image_url", length = 700)
    private String imageUrl;

    @Column(name = "safety_information", columnDefinition = "TEXT")
    private String safetyInformation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_id")
    private Destination destination;

    @OneToMany(mappedBy = "experience", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("id ASC")
    @JsonManagedReference
    private List<ExperienceLocation> locations = new ArrayList<>();

    public Experience() {}

    public Experience(String name, String description, String location, String difficulty, String duration,
                      String cost, String season, String imageUrl, String safetyInformation, Destination destination) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.difficulty = difficulty;
        this.duration = duration;
        this.estimatedCost = cost;
        this.bestSeason = season;
        this.imageUrl = imageUrl;
        this.safetyInformation = safetyInformation;
        this.destination = destination;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getLocation() { return location; }
    public String getDifficulty() { return difficulty; }
    public String getDuration() { return duration; }
    public String getEstimatedCost() { return estimatedCost; }
    public String getBestSeason() { return bestSeason; }
    public String getImageUrl() { return imageUrl; }
    public String getSafetyInformation() { return safetyInformation; }
    public Destination getDestination() { return destination; }
    public List<ExperienceLocation> getLocations() { return locations; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setLocation(String location) { this.location = location; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public void setDuration(String duration) { this.duration = duration; }
    public void setEstimatedCost(String estimatedCost) { this.estimatedCost = estimatedCost; }
    public void setBestSeason(String bestSeason) { this.bestSeason = bestSeason; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setSafetyInformation(String safetyInformation) { this.safetyInformation = safetyInformation; }
    public void setDestination(Destination destination) { this.destination = destination; }
    public void setLocations(List<ExperienceLocation> locations) { this.locations = locations == null ? new ArrayList<>() : locations; }

    public void addLocation(ExperienceLocation location) {
        if (this.locations == null) {
            this.locations = new ArrayList<>();
        }
        this.locations.add(location);
        location.setExperience(this);
    }
}

