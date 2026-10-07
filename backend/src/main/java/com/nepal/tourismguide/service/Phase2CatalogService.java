package com.nepal.tourismguide.service;

import com.nepal.tourismguide.entity.*;
import com.nepal.tourismguide.repository.*;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class Phase2CatalogService {
    private final HotelRepository hotels;
    private final RestaurantRepository restaurants;
    private final TransportationRepository transportation;
    private final TrekkingRouteRepository routes;

    public Phase2CatalogService(HotelRepository hotels, RestaurantRepository restaurants, TransportationRepository transportation, TrekkingRouteRepository routes) {
        this.hotels = hotels; this.restaurants = restaurants; this.transportation = transportation; this.routes = routes;
    }

    public List<Map<String, Object>> hotels() { return hotels.findAll().stream().map(this::hotel).toList(); }
    public List<Map<String, Object>> restaurants() { return restaurants.findAll().stream().map(this::restaurant).toList(); }
    public List<Map<String, Object>> transportation() { return transportation.findAll().stream().map(this::transport).toList(); }
    public List<Map<String, Object>> routes() { return routes.findAll().stream().map(this::route).toList(); }

    private Map<String, Object> hotel(Hotel value) {
        return map("id", value.getId(), "name", value.getName(), "destination", value.getDestination(), "description", value.getDescription(), "address", value.getAddress(), "websiteUrl", value.getWebsiteUrl(), "mapUrl", value.getMapUrl(), "imageUrl", value.getImageUrl(), "developmentData", value.isDevelopmentData());
    }
    private Map<String, Object> restaurant(Restaurant value) {
        return map("id", value.getId(), "name", value.getName(), "location", value.getLocation(), "cuisine", value.getCuisine(), "description", value.getDescription(), "websiteUrl", value.getWebsiteUrl(), "contactInformation", value.getContactInformation(), "mapUrl", value.getMapUrl(), "imageUrl", value.getImageUrl(), "developmentData", value.isDevelopmentData());
    }
    private Map<String, Object> transport(Transportation value) {
        return map("id", value.getId(), "type", value.getType(), "name", value.getName(), "route", value.getRoute(), "description", value.getDescription(), "importantInformation", value.getImportantInformation(), "contactWebsite", value.getContactWebsite(), "location", value.getLocation(), "developmentData", value.isDevelopmentData());
    }
    private Map<String, Object> route(TrekkingRoute value) {
        return map("id", value.getId(), "name", value.getName(), "region", value.getRegion(), "difficulty", value.getDifficulty(), "duration", value.getDuration(), "startingPoint", value.getStartingPoint(), "endingPoint", value.getEndingPoint(), "maximumElevation", value.getMaximumElevation(), "description", value.getDescription(), "latitude", value.getLatitude(), "longitude", value.getLongitude(), "mapUrl", value.getMapUrl(), "imageUrl", value.getImageUrl(), "developmentData", value.isDevelopmentData());
    }
    private Map<String, Object> map(Object... values) {
        Map<String, Object> result = new LinkedHashMap<>();
        for (int index = 0; index < values.length; index += 2) result.put((String) values[index], values[index + 1]);
        return result;
    }
}
