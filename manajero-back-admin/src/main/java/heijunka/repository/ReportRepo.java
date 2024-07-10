package heijunka.repository;

import heijunka.entite.Report;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepo extends MongoRepository<Report, Long> {
}
