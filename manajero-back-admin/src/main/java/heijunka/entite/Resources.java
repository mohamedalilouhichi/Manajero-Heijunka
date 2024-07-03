package heijunka.entite;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Resources {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idResource;


    @ManyToOne(cascade = CascadeType.ALL)
    Stock stock;
}
