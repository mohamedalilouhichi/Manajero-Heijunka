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
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idReport;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="report")
    private Set<ProductionData> ProductionDatas;
}
