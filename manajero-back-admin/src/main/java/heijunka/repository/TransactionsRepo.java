package heijunka.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import heijunka.entite.Transactions;

@Repository
public interface TransactionsRepo extends JpaRepository<Transactions, Long> {
}
