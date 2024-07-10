package heijunka.repository;

import heijunka.entite.ProductionAnomaly;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionAnomalyRepo extends MongoRepository<ProductionAnomaly, Long> {
}
