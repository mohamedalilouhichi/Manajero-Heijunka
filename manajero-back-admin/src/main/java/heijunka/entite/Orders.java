package heijunka.entite;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "orders")
public class Orders {
    @Id
    private String idOrder;

    private String userId;

    private String productionPlanId;

    private Set<String> productionAnomalyIds;
}
