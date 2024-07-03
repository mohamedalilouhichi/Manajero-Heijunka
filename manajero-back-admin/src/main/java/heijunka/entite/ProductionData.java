package heijunka.entite;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ProductionData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idData;

    @ManyToOne(cascade = CascadeType.ALL)
    Report report;
}
