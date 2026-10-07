package com.nepal.tourismguide.controller;

import com.nepal.tourismguide.service.Phase2CatalogService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
public class Phase2CatalogController {
    private final Phase2CatalogService catalog;
    public Phase2CatalogController(Phase2CatalogService catalog) { this.catalog = catalog; }

    @GetMapping("/hotels") public List<Map<String, Object>> hotels() { return catalog.hotels(); }
    @GetMapping("/restaurants") public List<Map<String, Object>> restaurants() { return catalog.restaurants(); }
    @GetMapping("/transportation") public List<Map<String, Object>> transportation() { return catalog.transportation(); }
    @GetMapping("/trekking-routes") public List<Map<String, Object>> trekkingRoutes() { return catalog.routes(); }
}
