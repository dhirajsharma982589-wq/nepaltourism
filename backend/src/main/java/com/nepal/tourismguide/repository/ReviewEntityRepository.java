package com.nepal.tourismguide.repository;
import com.nepal.tourismguide.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface ReviewEntityRepository extends JpaRepository<ReviewEntity,Long>{List<ReviewEntity> findByDestinationId(Long destinationId); Optional<ReviewEntity> findByUserIdAndDestinationId(Long userId,Long destinationId);}
