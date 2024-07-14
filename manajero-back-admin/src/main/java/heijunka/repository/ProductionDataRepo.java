package heijunka.repository;

import heijunka.entite.ProductionData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionDataRepo extends MongoRepository<ProductionData, Long> {
}
