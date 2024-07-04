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
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idProduct;

    @OneToMany(mappedBy = "product")
    private Set<ProductionAnomaly> productionAnomalies;
}
