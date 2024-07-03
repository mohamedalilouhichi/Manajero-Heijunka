package heijunka.repository;

import heijunka.entite.ProductionData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionDataRepo extends JpaRepository<ProductionData, Long> {
}
