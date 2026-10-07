package com.nepal.tourismguide.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

public record AIAssistantRequest(
        @NotBlank @Size(max = 2000) String message,
        @Valid @Size(max = 12) List<ChatMessage> conversation
) {
    public record ChatMessage(@NotBlank @Size(max = 2000) String role, @NotBlank @Size(max = 4000) String content) {}
}
