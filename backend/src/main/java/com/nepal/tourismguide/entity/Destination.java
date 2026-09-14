package com.nepal.tourismguide.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "destinations", uniqueConstraints = @UniqueConstraint(name = "uk_destination_slug", columnNames = "slug"))
public class Destination {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 180) private String name;
    @Column(nullable = false, length = 180) private String slug;
    @Column(nullable = false, length = 180) private String location;
    @Column(name = "short_description", nullable = false, length = 500) private String shortDescription;
    @Column(columnDefinition = "TEXT") private String description;
    @ManyToOne(optional = false, fetch = FetchType.LAZY) @JoinColumn(name = "region_id", nullable = false) private Region region;
    @ManyToOne(optional = false, fetch = FetchType.LAZY) @JoinColumn(name = "category_id", nullable = false) private Category category;
    @Column(precision = 3, scale = 2) private BigDecimal rating;
    @Column(name = "best_season", length = 120) private String bestSeason;
    @Column(name = "estimated_budget", length = 120) private String estimatedBudget;
    @Column(name = "how_to_reach", length = 700) private String howToReach;
    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL, orphanRemoval = true) private List<DestinationImage> images = new ArrayList<>();
    @Column(nullable = false, updatable = false) private Instant createdAt = Instant.now();
    @Column(nullable = false) private Instant updatedAt = Instant.now();
    public Destination() {}
    public Destination(String name, String slug, String location, String shortDescription, String description, Region region, Category category, BigDecimal rating, String bestSeason, String budget, String howToReach) {
        this.name=name; this.slug=slug; this.location=location; this.shortDescription=shortDescription; this.description=description; this.region=region; this.category=category; this.rating=rating; this.bestSeason=bestSeason; this.estimatedBudget=budget; this.howToReach=howToReach;
    }
    public void addImage(String url, boolean primary) { images.add(new DestinationImage(this, url, primary, images.size())); }
    @PreUpdate void touch() { updatedAt = Instant.now(); }
    public Long getId(){return id;} public String getName(){return name;} public String getSlug(){return slug;} public String getLocation(){return location;} public String getShortDescription(){return shortDescription;} public String getDescription(){return description;} public Region getRegion(){return region;} public Category getCategory(){return category;} public BigDecimal getRating(){return rating;} public String getBestSeason(){return bestSeason;} public String getEstimatedBudget(){return estimatedBudget;} public String getHowToReach(){return howToReach;} public List<DestinationImage> getImages(){return images;}
    public void setName(String v){name=v;} public void setSlug(String v){slug=v;} public void setLocation(String v){location=v;} public void setShortDescription(String v){shortDescription=v;} public void setDescription(String v){description=v;} public void setRegion(Region v){region=v;} public void setCategory(Category v){category=v;} public void setRating(BigDecimal v){rating=v;} public void setBestSeason(String v){bestSeason=v;} public void setEstimatedBudget(String v){estimatedBudget=v;} public void setHowToReach(String v){howToReach=v;}
}
