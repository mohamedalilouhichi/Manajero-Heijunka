package heijunka.repository;

import heijunka.entite.ProductionPlan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionPlanRepo extends MongoRepository<ProductionPlan, String> {
}
