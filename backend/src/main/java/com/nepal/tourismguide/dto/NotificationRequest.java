package com.nepal.tourismguide.dto;

import com.nepal.tourismguide.entity.NotificationPriority;
import com.nepal.tourismguide.entity.NotificationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record NotificationRequest(
        @NotBlank String title,
        @NotBlank String message,
        @NotNull NotificationType type,
        String destination,
        @NotNull NotificationPriority priority,
        Boolean active,
        LocalDateTime expiresAt) {
}
