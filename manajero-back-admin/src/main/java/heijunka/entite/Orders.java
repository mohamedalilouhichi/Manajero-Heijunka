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
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idOrder;

    @ManyToOne
    private User user;

    @OneToOne
    private ProductionPlan productionPlan;

    @OneToMany(mappedBy = "orders")
    private Set<ProductionAnomaly> productionAnomalies;
}
