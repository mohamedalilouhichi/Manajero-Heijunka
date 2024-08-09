package heijunka.entite;

import com.fasterxml.jackson.annotation.JsonProperty;
import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "production_plans")
public class ProductionPlan {
    @Id
    private String idPlan;

    @JsonProperty("WorkDays")
    private int workDays;

    @JsonProperty("WorkHours")
    private int workHours;

    @JsonProperty("AvailableTime")
    private int availableTime;
}
