package com.nepal.tourismguide.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        return ResponseEntity.ok(Map.of(
                "totalDestinations", 18,
                "totalReviews", 124,
                "activeUsers", 350,
                "pendingApprovals", 9
        ));
    }

    @GetMapping("/content")
    public ResponseEntity<List<Map<String, Object>>> getContent() {
        return ResponseEntity.ok(List.of(
                Map.of("id", 1, "title", "Pokhara Highlights", "status", "Published"),
                Map.of("id", 2, "title", "Mustang Travel Guide", "status", "Draft"),
                Map.of("id", 3, "title", "Basantapur Heritage Post", "status", "Reviewed")
        ));
    }
}
