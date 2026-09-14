package com.nepal.tourismguide.repository;
import com.nepal.tourismguide.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface TripRepository extends JpaRepository<Trip,Long>{List<Trip> findByUserId(Long userId); Optional<Trip> findByIdAndUserId(Long id,Long userId);}
