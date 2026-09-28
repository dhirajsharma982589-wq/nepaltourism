package com.nepal.tourismguide.controller;
import com.nepal.tourismguide.entity.*;
import com.nepal.tourismguide.exception.ApiException;
import com.nepal.tourismguide.repository.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class CatalogController {
 private final DestinationRepository destinations; private final RegionRepository regions; private final CategoryRepository categories; private final ExperienceRepository experiences; private final FestivalRepository festivals; private final FoodRepository foods; private final TravelGuideRepository guides; private final EmergencyContactRepository emergency;
 public CatalogController(DestinationRepository d,RegionRepository r,CategoryRepository c,ExperienceRepository e,FestivalRepository f,FoodRepository food,TravelGuideRepository g,EmergencyContactRepository ec){destinations=d;regions=r;categories=c;experiences=e;festivals=f;foods=food;guides=g;emergency=ec;}
 private Map<String,Object> destination(Destination d){Map<String,Object> m=new LinkedHashMap<>();m.put("id",d.getId());m.put("name",d.getName());m.put("slug",d.getSlug());m.put("location",d.getLocation());m.put("shortDescription",d.getShortDescription());m.put("description",d.getDescription()==null?"":d.getDescription());m.put("region",d.getRegion().getName());m.put("category",d.getCategory().getName());m.put("rating",d.getRating());m.put("bestSeason",d.getBestSeason());m.put("estimatedBudget",d.getEstimatedBudget());m.put("howToReach",d.getHowToReach());m.put("images",d.getImages().stream().map(DestinationImage::getImageUrl).toList());return m;}
 private Map<String,Object> experiencePayload(Experience e){Map<String,Object> m=new LinkedHashMap<>();m.put("id",e.getId());m.put("name",e.getName());m.put("description",e.getDescription()==null?"":e.getDescription());m.put("location",e.getLocation());m.put("difficulty",e.getDifficulty());m.put("duration",e.getDuration());m.put("cost",e.getEstimatedCost());m.put("season",e.getBestSeason());m.put("image",e.getImageUrl());m.put("safety",e.getSafetyInformation()==null?"":e.getSafetyInformation());m.put("locations",e.getLocations()==null?List.of():e.getLocations().stream().map(location -> {Map<String,Object> locationMap=new LinkedHashMap<>();locationMap.put("id", location.getId());locationMap.put("name", location.getName());locationMap.put("location", location.getLocation());locationMap.put("region", location.getRegion());locationMap.put("description", location.getDescription()==null?"":location.getDescription());locationMap.put("imageUrl", location.getImageUrl());return locationMap;} ).toList());return m;}
 private Map<String,Object> festivalPayload(Festival f){Map<String,Object> m=new LinkedHashMap<>();m.put("id",f.getId());m.put("name",f.getName());m.put("description",f.getDescription());m.put("culturalSignificance",f.getCulturalSignificance());m.put("season",f.getSeason());m.put("imageUrl",f.getImageUrl());m.put("region",f.getRegion()==null?null:f.getRegion().getName());return m;}
 private Map<String,Object> foodPayload(Food f){Map<String,Object> m=new LinkedHashMap<>();m.put("id",f.getId());m.put("name",f.getName());m.put("description",f.getDescription());m.put("imageUrl",f.getImageUrl());m.put("vegetarian",f.isVegetarian());m.put("region",f.getRegion()==null?null:f.getRegion().getName());return m;}
 @GetMapping("/destinations") public List<Map<String,Object>> destinationList(@RequestParam(required=false) String search,@RequestParam(required=false) String region,@RequestParam(required=false) String category){return destinations.search(blank(search),blank(region),blank(category)).stream().map(this::destination).toList();}
 @GetMapping("/destinations/{id}") public Map<String,Object> destination(@PathVariable Long id){return destination(destinations.findById(id).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Destination not found")));}
 @GetMapping("/destinations/slug/{slug}") public Map<String,Object> bySlug(@PathVariable String slug){return destination(destinations.findBySlugIgnoreCase(slug).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Destination not found")));}
 @GetMapping("/regions") public List<Region> regionList(){return regions.findAll();}
 @GetMapping("/regions/{id}/destinations") public List<Map<String,Object>> regionDestinations(@PathVariable Long id){return destinations.findByRegionId(id).stream().map(this::destination).toList();}
 @GetMapping("/categories") public List<Category> categoryList(){return categories.findAll();}
 @GetMapping("/categories/{id}/destinations") public List<Map<String,Object>> categoryDestinations(@PathVariable Long id){return destinations.findByCategoryId(id).stream().map(this::destination).toList();}
 @GetMapping("/experiences") public List<Map<String,Object>> experienceList(){return experiences.findAll().stream().map(this::experiencePayload).toList();}
 @GetMapping("/experiences/{id}") public Map<String,Object> experience(@PathVariable Long id){return experiencePayload(experiences.findById(id).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Experience not found")));}
 @GetMapping("/festivals") public List<Map<String,Object>> festivalList(){return festivals.findAll().stream().map(this::festivalPayload).toList();}
 @GetMapping("/festivals/{id}") public Map<String,Object> festival(@PathVariable Long id){return festivalPayload(festivals.findById(id).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Festival not found")));}
 @GetMapping("/foods") public List<Map<String,Object>> foodList(){return foods.findAll().stream().map(this::foodPayload).toList();}
 @GetMapping("/foods/{id}") public Map<String,Object> food(@PathVariable Long id){return foodPayload(foods.findById(id).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Food not found")));}
 @GetMapping("/travel-guide") public List<TravelGuide> guide(){return guides.findAll();}
 @GetMapping("/emergency-contacts") public List<EmergencyContact> contacts(){return emergency.findAll();}
 private String blank(String value){return value==null||value.isBlank()?null:value;}
}
