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
public class HeijunkaBox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idBox;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Resources> Resources;
}
