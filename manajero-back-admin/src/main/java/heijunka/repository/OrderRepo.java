package heijunka.repository;

import heijunka.entite.Orders;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends MongoRepository<Orders, String> {
    @Query("{ 'product.idproduct': ?0 }")
    List<Orders> findByProductId(String productId);}
