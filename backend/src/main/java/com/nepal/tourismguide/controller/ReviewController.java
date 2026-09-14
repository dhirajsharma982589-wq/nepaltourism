package com.nepal.tourismguide.controller;

import com.nepal.tourismguide.model.Review;
import com.nepal.tourismguide.model.ReviewStatus;
import com.nepal.tourismguide.repository.ReviewRepository;
import com.nepal.tourismguide.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/legacy-reviews")
public class ReviewController {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public ReviewController(ReviewRepository reviewRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{destinationName}")
    public List<Review> getApprovedReviews(@PathVariable String destinationName) {
        return reviewRepository.findByDestinationNameAndStatus(destinationName, ReviewStatus.APPROVED);
    }

    @PostMapping
    public ResponseEntity<?> addReview(@Valid @RequestBody ReviewRequest request, Authentication authentication) {
        Long userId = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("Authenticated user no longer exists"))
                .getId();
        if (reviewRepository.findByUserIdAndDestinationName(userId, request.destinationName()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "You already reviewed this destination."));
        }
        Review review = new Review();
        review.setUserId(userId);
        review.setDestinationName(request.destinationName());
        review.setRating(request.rating());
        review.setReviewText(request.reviewText());
        return ResponseEntity.ok(reviewRepository.save(review));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOwnReview(@PathVariable Long id, Authentication authentication) {
        Long userId = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("Authenticated user no longer exists"))
                .getId();
        reviewRepository.findById(id).filter(review -> review.getUserId().equals(userId)).ifPresent(reviewRepository::delete);
        return ResponseEntity.noContent().build();
    }

    public record ReviewRequest(@NotBlank String destinationName, @Min(1) @Max(5) int rating, @NotBlank String reviewText) {}
}
