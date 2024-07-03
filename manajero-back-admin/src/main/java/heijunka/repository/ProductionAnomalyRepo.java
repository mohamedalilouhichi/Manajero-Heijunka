package heijunka.repository;

import heijunka.entite.ProductionAnomaly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionAnomalyRepo extends JpaRepository<ProductionAnomaly, Long> {
}
