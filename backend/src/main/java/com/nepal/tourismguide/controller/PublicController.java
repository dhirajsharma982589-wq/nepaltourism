package com.nepal.tourismguide.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @GetMapping("/destinations")
    public ResponseEntity<List<Map<String, Object>>> getDestinations() {
        return ResponseEntity.ok(List.of(
                Map.of(
                        "id", 1,
                        "name", "Pokhara",
                        "category", "Lakeside Escape",
                        "description", "A tranquil city with lakes, mountains, and adventure sports.",
                        "imageUrl", "https://images.unsplash.com/photo-1544735716-392fe2489ffa"
                ),
                Map.of(
                        "id", 2,
                        "name", "Kathmandu Valley",
                        "category", "Cultural Heritage",
                        "description", "Temples, palaces, heritage streets, and vibrant local life.",
                        "imageUrl", "https://images.unsplash.com/photo-1605640840605-14ac1855827b"
                ),
                Map.of(
                        "id", 3,
                        "name", "Everest Region",
                        "category", "Mountain Adventure",
                        "description", "The iconic Himalayan region for trekking and unforgettable views.",
                        "imageUrl", "https://images.unsplash.com/photo-1526392060635-9d6019884377"
                )
        ));
    }

    @GetMapping("/travel-tips")
    public ResponseEntity<List<Map<String, Object>>> getTravelTips() {
        return ResponseEntity.ok(List.of(
                Map.of("title", "Best time to visit", "content", "October to December is ideal for most regions."),
                Map.of("title", "Travel documents", "content", "Carry a valid passport and ensure Nepal visa requirements are met."),
                Map.of("title", "Local etiquette", "content", "Respect temples, dress modestly, and ask before photographing people." )
        ));
    }
}
