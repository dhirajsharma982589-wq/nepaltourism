package com.nepal.tourismguide.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "legacy_reviews", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "destination_name"}))
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "destination_name", nullable = false)
    private String destinationName;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false, length = 2000)
    private String reviewText;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReviewStatus status = ReviewStatus.PENDING;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getDestinationName() { return destinationName; }
    public void setDestinationName(String destinationName) { this.destinationName = destinationName; }
    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
    public String getReviewText() { return reviewText; }
    public void setReviewText(String reviewText) { this.reviewText = reviewText; }
    public ReviewStatus getStatus() { return status; }
    public void setStatus(ReviewStatus status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
}
