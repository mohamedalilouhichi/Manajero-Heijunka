package heijunka.repository;

import heijunka.entite.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends MongoRepository<Product, String> {
    Product findByProductNameAndProductCode(String productName, String productCode);
    List<Product> findByArchivedTrue();
}
