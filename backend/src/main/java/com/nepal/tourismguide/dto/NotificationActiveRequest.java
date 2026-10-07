package com.nepal.tourismguide.dto;

import jakarta.validation.constraints.NotNull;

public record NotificationActiveRequest(@NotNull Boolean active) {
}
