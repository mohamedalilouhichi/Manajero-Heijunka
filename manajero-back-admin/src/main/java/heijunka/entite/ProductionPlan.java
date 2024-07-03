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
public class ProductionPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPlan;


    @OneToMany(cascade = CascadeType.ALL)
    private Set<HeijunkaBox> HeijunkaBoxs;
}
