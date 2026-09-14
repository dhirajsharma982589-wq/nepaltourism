package com.nepal.tourismguide.controller;
import com.nepal.tourismguide.entity.*;
import com.nepal.tourismguide.exception.ApiException;
import com.nepal.tourismguide.model.User;
import com.nepal.tourismguide.repository.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api")
public class UserResourceController {
 private final UserRepository users; private final DestinationRepository destinations; private final FavoriteRepository favorites; private final TripRepository trips; private final TripItemRepository items; private final ReviewEntityRepository reviews;
 public UserResourceController(UserRepository u,DestinationRepository d,FavoriteRepository f,TripRepository t,TripItemRepository i,ReviewEntityRepository r){users=u;destinations=d;favorites=f;trips=t;items=i;reviews=r;}
 private User user(Authentication a){return users.findByEmail(a.getName()).orElseThrow(()->new ApiException(HttpStatus.UNAUTHORIZED,"User not found"));}
 private Map<String,Object> review(ReviewEntity r){return Map.of("id",r.getId(),"rating",r.getRating(),"comment",r.getComment(),"user",r.getUser().getFullName(),"destinationId",r.getDestination().getId(),"createdAt",r.getCreatedAt());}
 @GetMapping("/destinations/{id}/reviews") public List<Map<String,Object>> reviews(@PathVariable Long id){return reviews.findByDestinationId(id).stream().map(this::review).toList();}
 @PostMapping("/destinations/{id}/reviews") public Map<String,Object> addReview(@PathVariable Long id,@Valid @RequestBody ReviewRequest request,Authentication auth){User u=user(auth); Destination d=destinations.findById(id).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Destination not found")); if(reviews.findByUserIdAndDestinationId(u.getId(),id).isPresent()) throw new ApiException(HttpStatus.CONFLICT,"You have already reviewed this destination"); return review(reviews.save(new ReviewEntity(request.rating(),request.comment(),u,d)));}
 @PutMapping("/reviews/{id}") public Map<String,Object> updateReview(@PathVariable Long id,@Valid @RequestBody ReviewRequest request,Authentication auth){ReviewEntity r=reviews.findById(id).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Review not found")); User u=user(auth); if(!r.getUser().getId().equals(u.getId())&&!u.getRole().name().equals("ADMIN")) throw new ApiException(HttpStatus.FORBIDDEN,"You can only edit your own reviews"); r.setRating(request.rating());r.setComment(request.comment());return review(reviews.save(r));}
 @DeleteMapping("/reviews/{id}") public ResponseEntity<Void> deleteReview(@PathVariable Long id,Authentication auth){ReviewEntity r=reviews.findById(id).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Review not found")); User u=user(auth); if(!r.getUser().getId().equals(u.getId())&&!u.getRole().name().equals("ADMIN")) throw new ApiException(HttpStatus.FORBIDDEN,"You can only delete your own reviews"); reviews.delete(r);return ResponseEntity.noContent().build();}
 @GetMapping("/favorites") public List<Map<String,Object>> favoriteList(Authentication auth){List<Map<String,Object>> result=new ArrayList<>();for(Favorite f:favorites.findByUserId(user(auth).getId())){Map<String,Object> m=new LinkedHashMap<>();m.put("id",f.getId());m.put("destinationId",f.getDestination().getId());m.put("destinationName",f.getDestination().getName());m.put("image",f.getDestination().getImages().isEmpty()?"":f.getDestination().getImages().get(0).getImageUrl());result.add(m);}return result;}
 @PostMapping("/favorites/{destinationId}") public ResponseEntity<?> favorite(@PathVariable Long destinationId,Authentication auth){User u=user(auth);Destination d=destinations.findById(destinationId).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Destination not found"));if(favorites.findByUserIdAndDestinationId(u.getId(),destinationId).isPresent())throw new ApiException(HttpStatus.CONFLICT,"Destination is already a favorite");return ResponseEntity.status(HttpStatus.CREATED).body(favorites.save(new Favorite(u,d)));}
 @DeleteMapping("/favorites/{destinationId}") public ResponseEntity<Void> unfavorite(@PathVariable Long destinationId,Authentication auth){Favorite f=favorites.findByUserIdAndDestinationId(user(auth).getId(),destinationId).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Favorite not found"));favorites.delete(f);return ResponseEntity.noContent().build();}
 @GetMapping("/trips") public List<Trip> tripList(Authentication auth){return trips.findByUserId(user(auth).getId());}
 @GetMapping("/trips/{id}") public Trip trip(@PathVariable Long id,Authentication auth){return ownedTrip(id,auth);}
 @PostMapping("/trips") public Trip createTrip(@Valid @RequestBody TripRequest request,Authentication auth){return trips.save(new Trip(request.name(),request.startDate(),request.endDate(),request.budget(),request.travelStyle(),user(auth)));}
 @PutMapping("/trips/{id}") public Trip updateTrip(@PathVariable Long id,@Valid @RequestBody TripRequest request,Authentication auth){Trip t=ownedTrip(id,auth);t.setName(request.name());t.setStartDate(request.startDate());t.setEndDate(request.endDate());t.setBudget(request.budget());t.setTravelStyle(request.travelStyle());return trips.save(t);}
 @DeleteMapping("/trips/{id}") public ResponseEntity<Void> deleteTrip(@PathVariable Long id,Authentication auth){trips.delete(ownedTrip(id,auth));return ResponseEntity.noContent().build();}
 @PostMapping("/trips/{tripId}/items") public TripItem addItem(@PathVariable Long tripId,@Valid @RequestBody TripItemRequest request,Authentication auth){Trip t=ownedTrip(tripId,auth);Destination d=destinations.findById(request.destinationId()).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Destination not found"));return items.save(new TripItem(t,d,request.dayNumber(),request.notes(),request.activities()));}
 @PutMapping("/trip-items/{id}") public TripItem updateItem(@PathVariable Long id,@Valid @RequestBody TripItemRequest request,Authentication auth){TripItem i=items.findById(id).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Trip item not found"));ownedTrip(i.getTrip().getId(),auth);i.setDayNumber(request.dayNumber());i.setNotes(request.notes());i.setActivities(request.activities());return items.save(i);}
 @DeleteMapping("/trip-items/{id}") public ResponseEntity<Void> deleteItem(@PathVariable Long id,Authentication auth){TripItem i=items.findById(id).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Trip item not found"));ownedTrip(i.getTrip().getId(),auth);items.delete(i);return ResponseEntity.noContent().build();}
 private Trip ownedTrip(Long id,Authentication a){return trips.findByIdAndUserId(id,user(a).getId()).orElseThrow(()->new ApiException(HttpStatus.NOT_FOUND,"Trip not found"));}
 public record ReviewRequest(@Min(1) @Max(5) int rating,@NotBlank @Size(max=2000) String comment){}
 public record TripRequest(@NotBlank @Size(max=180) String name,LocalDate startDate,LocalDate endDate,@Size(max=100) String budget,@Size(max=40) String travelStyle){}
 public record TripItemRequest(@Positive Long destinationId,@Min(1) int dayNumber,@Size(max=500) String notes,@Size(max=700) String activities){}
}
