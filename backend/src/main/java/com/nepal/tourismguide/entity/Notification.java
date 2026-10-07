package com.nepal.tourismguide.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private NotificationType type;

    @Column(length = 120)
    private String destination;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private NotificationPriority priority = NotificationPriority.NORMAL;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime expiresAt;

    public Notification() {
    }

    public Notification(String title, String message, String type, String destination, int priority) {
        this.title = title;
        this.message = message;
        this.type = NotificationType.valueOf(type);
        this.destination = destination;
        this.priority = priority >= 9 ? NotificationPriority.HIGH
                : priority <= 3 ? NotificationPriority.LOW : NotificationPriority.NORMAL;
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getMessage() { return message; }
    public NotificationType getType() { return type; }
    public String getDestination() { return destination; }
    public NotificationPriority getPriority() { return priority; }
    public boolean isActive() { return active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getExpiresAt() { return expiresAt; }

    public void setTitle(String title) { this.title = title; }
    public void setMessage(String message) { this.message = message; }
    public void setType(NotificationType type) { this.type = type; }
    public void setDestination(String destination) { this.destination = destination; }
    public void setPriority(NotificationPriority priority) { this.priority = priority; }
    public void setActive(boolean active) { this.active = active; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
}
