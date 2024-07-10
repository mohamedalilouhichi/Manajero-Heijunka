package heijunka.entite;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Data
@Document(collection = "heijunka_box")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeijunkaBox {
    @Id
    private String id;

    private String productionPlanId;
}
