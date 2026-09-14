package com.nepal.tourismguide.repository;
import com.nepal.tourismguide.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface FavoriteRepository extends JpaRepository<Favorite,Long>{List<Favorite> findByUserId(Long userId); Optional<Favorite> findByUserIdAndDestinationId(Long userId,Long destinationId);}
