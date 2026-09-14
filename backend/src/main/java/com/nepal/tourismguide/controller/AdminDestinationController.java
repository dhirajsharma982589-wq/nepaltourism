package com.nepal.tourismguide.controller;
import com.nepal.tourismguide.entity.*;
import com.nepal.tourismguide.exception.ApiException;
import com.nepal.tourismguide.repository.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/destinations")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDestinationController {
 private final DestinationRepository destinations; private final RegionRepository regions; private final CategoryRepository categories;
 public AdminDestinationController(DestinationRepository d,RegionRepository r,CategoryRepository c){destinations=d;regions=r;categories=c;}
 @PostMapping public ResponseEntity<Map<String,Object>> create(@Valid @RequestBody DestinationRequest request){Destination d=new Destination(request.name(),request.slug(),request.location(),request.shortDescription(),request.description(),region(request.region()),category(request.category()),request.rating(),request.bestSeason(),request.estimatedBudget(),request.howToReach());if(request.imageUrl()!=null&&!request.imageUrl().isBlank())d.addImage(request.imageUrl(),true);Destination saved=destinations.save(d);return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id",saved.getId(),"slug",saved.getSlug()));}
 @PutMapping("/{id}") public Map<String,Object> update(@PathVariable Long id,@Valid @RequestBody DestinationRequest r){Destination d=destinations.findById(id).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Destination not found"));d.setName(r.name());d.setSlug(r.slug());d.setLocation(r.location());d.setShortDescription(r.shortDescription());d.setDescription(r.description());d.setRegion(region(r.region()));d.setCategory(category(r.category()));d.setRating(r.rating());d.setBestSeason(r.bestSeason());d.setEstimatedBudget(r.estimatedBudget());d.setHowToReach(r.howToReach());destinations.save(d);return Map.of("message","Destination updated","id",id);}
 @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id){if(!destinations.existsById(id))throw new ApiException(HttpStatus.NOT_FOUND,"Destination not found");destinations.deleteById(id);return ResponseEntity.noContent().build();}
 private Region region(String name){return regions.findByNameIgnoreCase(name).orElseThrow(()->new ApiException(HttpStatus.BAD_REQUEST,"Unknown region: "+name));}
 private Category category(String name){return categories.findByNameIgnoreCase(name).orElseThrow(()->new ApiException(HttpStatus.BAD_REQUEST,"Unknown category: "+name));}
 public record DestinationRequest(@NotBlank String name,@NotBlank String slug,@NotBlank String location,@NotBlank String shortDescription,@NotBlank String description,@NotBlank String region,@NotBlank String category,@DecimalMin("0") @DecimalMax("5") BigDecimal rating,@NotBlank String bestSeason,@NotBlank String estimatedBudget,@NotBlank String howToReach,String imageUrl){}
}
