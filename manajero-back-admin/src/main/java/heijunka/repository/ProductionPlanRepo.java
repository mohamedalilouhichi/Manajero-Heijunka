package heijunka.repository;

import heijunka.entite.ProductionPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionPlanRepo extends JpaRepository<ProductionPlan, Long> {
}
