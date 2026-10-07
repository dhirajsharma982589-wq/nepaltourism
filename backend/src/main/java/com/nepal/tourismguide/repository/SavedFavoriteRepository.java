package com.nepal.tourismguide.repository;

import com.nepal.tourismguide.entity.SavedFavorite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface SavedFavoriteRepository extends JpaRepository<SavedFavorite, Long> {
    List<SavedFavorite> findByUserId(Long userId);
    Optional<SavedFavorite> findByUserIdAndItemTypeAndItemId(Long userId, String itemType, String itemId);
}
