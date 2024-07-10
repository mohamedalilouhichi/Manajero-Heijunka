package heijunka.entite;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "production_anomalies")
public class ProductionAnomaly {
    @Id
    private String idAnomaly;

    private String orderId;

    private String productId;
}
