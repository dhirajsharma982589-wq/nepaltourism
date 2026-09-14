package com.nepal.tourismguide.entity;

import com.nepal.tourismguide.model.User;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "favorites", uniqueConstraints = @UniqueConstraint(name = "uk_favorite_user_destination", columnNames = {"user_id", "destination_id"}))
public class Favorite {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(optional = false, fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false) private User user;
    @ManyToOne(optional = false, fetch = FetchType.LAZY) @JoinColumn(name = "destination_id", nullable = false) private Destination destination;
    @Column(nullable = false, updatable = false) private Instant createdAt = Instant.now();
    public Favorite() {}
    public Favorite(User user, Destination destination) { this.user=user; this.destination=destination; }
    public Long getId(){return id;} public User getUser(){return user;} public Destination getDestination(){return destination;} public Instant getCreatedAt(){return createdAt;}
}
