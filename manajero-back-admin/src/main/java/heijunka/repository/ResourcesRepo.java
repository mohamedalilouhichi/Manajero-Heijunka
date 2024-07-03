package heijunka.repository;

import heijunka.entite.Resources;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourcesRepo extends JpaRepository<Resources, Long> {
}
