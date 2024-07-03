package heijunka.repository;


import heijunka.entite.HeijunkaBox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeijunkaBoxRepo extends JpaRepository<HeijunkaBox, Long> {
}
