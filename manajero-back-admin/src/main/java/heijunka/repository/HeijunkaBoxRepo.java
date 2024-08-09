package heijunka.repository;

import heijunka.entite.HeijunkaBox;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.domain.Sort;
import java.util.List;

public interface HeijunkaBoxRepo extends MongoRepository<HeijunkaBox, String> {
    List<HeijunkaBox> findAll(Sort sort);
}
