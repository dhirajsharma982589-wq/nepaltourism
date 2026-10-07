package com.nepal.tourismguide.controller;

import com.nepal.tourismguide.dto.AIAssistantRequest;
import com.nepal.tourismguide.dto.AIAssistantResponse;
import com.nepal.tourismguide.service.AITourismAssistantService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIAssistantController {
    private final AITourismAssistantService assistant;
    public AIAssistantController(AITourismAssistantService assistant) { this.assistant = assistant; }

    @PostMapping("/assistant")
    public AIAssistantResponse answer(@Valid @RequestBody AIAssistantRequest request) { return assistant.answer(request); }
}
