package com.nepal.tourismguide.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nepal.tourismguide.dto.AIAssistantRequest;
import com.nepal.tourismguide.dto.AIAssistantResponse;
import com.nepal.tourismguide.entity.Destination;
import com.nepal.tourismguide.entity.Experience;
import com.nepal.tourismguide.entity.*;
import com.nepal.tourismguide.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AITourismAssistantService {
    private final DestinationRepository destinations;
    private final ExperienceRepository experiences;
    private final FestivalRepository festivals;
    private final FoodRepository foods;
    private final TrekkingRouteRepository routes;
    private final TransportationRepository transportation;
    private final HotelRepository hotels;
    private final RestaurantRepository restaurants;
    private final ObjectMapper objectMapper;
    private final RestClient restClient;
    private final String apiKey;
    private final String apiUrl;
    private final String model;

    public AITourismAssistantService(DestinationRepository destinations, ExperienceRepository experiences, FestivalRepository festivals, FoodRepository foods, TrekkingRouteRepository routes, TransportationRepository transportation, HotelRepository hotels, RestaurantRepository restaurants, ObjectMapper objectMapper,
                                     @Value("${AI_API_KEY:}") String apiKey,
                                     @Value("${AI_API_URL:https://api.openai.com/v1/chat/completions}") String apiUrl,
                                     @Value("${AI_MODEL:gpt-4o-mini}") String model) {
        this.destinations = destinations; this.experiences = experiences; this.festivals = festivals; this.foods = foods; this.routes = routes; this.transportation = transportation; this.hotels = hotels; this.restaurants = restaurants; this.objectMapper = objectMapper;
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(5000);
        requestFactory.setReadTimeout(10000);
        this.restClient = RestClient.builder().requestFactory(requestFactory).build();
        this.apiKey = apiKey == null ? "" : apiKey.trim(); this.apiUrl = apiUrl; this.model = model;
    }

    public AIAssistantResponse answer(AIAssistantRequest request) {
        if (apiKey.isBlank()) return new AIAssistantResponse(false, false, "AI assistant is not configured yet.");
        try {
            Map<String, Object> payload = new LinkedHashMap<>();
            payload.put("model", model);
            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "system", "content", systemPrompt()));
            if (request.conversation() != null) {
                request.conversation().stream().limit(12).forEach(item -> {
                    String role = "assistant".equalsIgnoreCase(item.role()) ? "assistant" : "user";
                    messages.add(Map.of("role", role, "content", item.content()));
                });
            }
            messages.add(Map.of("role", "user", "content", request.message()));
            payload.put("messages", messages);
            String body = restClient.post().uri(apiUrl).contentType(MediaType.APPLICATION_JSON)
                    .header("Authorization", "Bearer " + apiKey).body(payload).retrieve().body(String.class);
            JsonNode root = objectMapper.readTree(body);
            String content = root.path("choices").path(0).path("message").path("content").asText("");
            if (content.isBlank()) return new AIAssistantResponse(true, false, "The AI assistant returned no answer. Please try again.");
            return new AIAssistantResponse(true, true, content);
        } catch (Exception error) {
            return new AIAssistantResponse(true, false, "The AI assistant is temporarily unavailable. Please use the guide and trip planner while it recovers.");
        }
    }

    private String systemPrompt() {
        String destinationContext = destinations.findAll().stream().limit(40).map(Destination::getName).collect(Collectors.joining(", "));
        String experienceContext = experiences.findAll().stream().limit(20).map(Experience::getName).collect(Collectors.joining(", "));
        String festivalContext = festivals.findAll().stream().limit(20).map(Festival::getName).collect(Collectors.joining(", "));
        String foodContext = foods.findAll().stream().limit(20).map(Food::getName).collect(Collectors.joining(", "));
        String routeContext = routes.findAll().stream().limit(20).map(TrekkingRoute::getName).collect(Collectors.joining(", "));
        String transportContext = transportation.findAll().stream().limit(20).map(Transportation::getName).collect(Collectors.joining(", "));
        String hotelContext = hotels.findAll().stream().limit(20).map(Hotel::getName).collect(Collectors.joining(", "));
        String restaurantContext = restaurants.findAll().stream().limit(20).map(Restaurant::getName).collect(Collectors.joining(", "));
        return "You are the Nepal Tourism Guide assistant. Give concise, practical tourism guidance. " +
                "Use only the supplied project context for project-specific facts. Clearly label general suggestions and uncertainty. " +
                "Never invent live availability, bookings, prices, schedules, ratings, festival dates, or safety guarantees. " +
                "Tell users to verify changing information with official providers. Project destinations: " + destinationContext + ". " +
                "Project experiences: " + experienceContext + ". Project festivals: " + festivalContext + ". Project foods: " + foodContext + ". " +
                "Project trekking routes: " + routeContext + ". Project transportation: " + transportContext + ". " +
                "Project hotels: " + hotelContext + ". Project restaurants: " + restaurantContext + ".";
    }
}
