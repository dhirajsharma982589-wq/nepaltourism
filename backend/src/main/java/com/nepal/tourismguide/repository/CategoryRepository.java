package com.nepal.tourismguide.repository;
import com.nepal.tourismguide.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface CategoryRepository extends JpaRepository<Category,Long>{Optional<Category> findByNameIgnoreCase(String name);}
