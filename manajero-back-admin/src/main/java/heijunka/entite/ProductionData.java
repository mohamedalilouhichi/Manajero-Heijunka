package heijunka.entite;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "production_data")
public class ProductionData {
    @Id
    private String idData;

    private String userId;

    private String reportId;
}
