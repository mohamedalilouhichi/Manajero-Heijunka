package heijunka.entite;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idStock;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Products> Products;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Transactions> Transactions;
}
