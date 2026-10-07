package com.nepal.tourismguide.repository;

import com.nepal.tourismguide.entity.Notification;
import com.nepal.tourismguide.entity.NotificationType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query("""
        SELECT n FROM Notification n
        WHERE (:active IS NULL OR n.active = :active)
          AND (:type IS NULL OR n.type = :type)
          AND (:destination IS NULL OR LOWER(n.destination) = LOWER(:destination))
          AND (:active = false OR :active IS NULL OR n.expiresAt IS NULL OR n.expiresAt > :now)
        ORDER BY CASE n.priority
            WHEN com.nepal.tourismguide.entity.NotificationPriority.HIGH THEN 3
            WHEN com.nepal.tourismguide.entity.NotificationPriority.NORMAL THEN 2
            ELSE 1
        END DESC, n.createdAt DESC
        """)
    List<Notification> search(
            @Param("active") Boolean active,
            @Param("type") NotificationType type,
            @Param("destination") String destination,
            @Param("now") LocalDateTime now,
            Pageable pageable);
}
