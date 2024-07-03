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
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idOrder;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Resources> Resources;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<ProductionAnomaly> ProductionAnomalys;

    @ManyToOne
    User user;
}
