package com.nepal.tourismguide.repository;

import com.nepal.tourismguide.model.Review;
import com.nepal.tourismguide.model.ReviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByDestinationNameAndStatus(String destinationName, ReviewStatus status);
    Optional<Review> findByUserIdAndDestinationName(Long userId, String destinationName);
}
