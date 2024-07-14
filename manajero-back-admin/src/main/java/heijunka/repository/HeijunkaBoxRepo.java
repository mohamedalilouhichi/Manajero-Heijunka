package heijunka.repository;


import heijunka.entite.HeijunkaBox;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface HeijunkaBoxRepo extends MongoRepository<HeijunkaBox, Long> {
}
