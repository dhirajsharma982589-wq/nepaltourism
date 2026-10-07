package com.nepal.tourismguide.entity;

import com.nepal.tourismguide.model.User;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "saved_favorite_items", uniqueConstraints = @UniqueConstraint(name = "uk_saved_favorite_user_item", columnNames = {"user_id", "item_type", "item_id"}))
public class SavedFavorite {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(optional = false, fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false) private User user;
    @Column(name = "item_type", nullable = false, length = 40) private String itemType;
    @Column(name = "item_id", nullable = false, length = 120) private String itemId;
    @Column(name = "item_name", nullable = false, length = 180) private String itemName;
    @Column(name = "item_image", length = 700) private String itemImage;
    @Column(nullable = false, updatable = false) private Instant createdAt = Instant.now();

    protected SavedFavorite() {}
    public SavedFavorite(User user, String itemType, String itemId, String itemName, String itemImage) {
        this.user = user; this.itemType = itemType; this.itemId = itemId; this.itemName = itemName; this.itemImage = itemImage;
    }
    public Long getId() { return id; }
    public User getUser() { return user; }
    public String getItemType() { return itemType; }
    public String getItemId() { return itemId; }
    public String getItemName() { return itemName; }
    public String getItemImage() { return itemImage; }
    public Instant getCreatedAt() { return createdAt; }
}
