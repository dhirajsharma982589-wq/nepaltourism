package com.nepal.tourismguide.repository;
import com.nepal.tourismguide.entity.Destination;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.*;
public interface DestinationRepository extends JpaRepository<Destination,Long>{
 Optional<Destination> findBySlugIgnoreCase(String slug);
 @Query("select d from Destination d join d.region r join d.category c where (:search is null or lower(d.name) like lower(concat('%',:search,'%'))) and (:region is null or lower(r.name)=lower(:region)) and (:category is null or lower(c.name)=lower(:category)) order by d.rating desc")
 List<Destination> search(@Param("search") String search,@Param("region") String region,@Param("category") String category);
 List<Destination> findByRegionId(Long regionId);
 List<Destination> findByCategoryId(Long categoryId);
}
