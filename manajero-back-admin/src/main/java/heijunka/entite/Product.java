package heijunka.entite;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "products")
public class Product {
    @Id
    @JsonProperty("idProduct")
    private String idproduct;
    @JsonProperty("productName")

    private String productName;
    @JsonProperty("productCode")

    private String productCode;
    @JsonProperty("productCategory")

    private String productCategory;
    @JsonProperty("productDate")

    private Date productDate ;
    @JsonProperty("archived")
    private boolean archived;
    @JsonProperty("totalquantity")
    private int totalquantity ;
    @JsonProperty("takttime")
    private double takttime ;
    @JsonProperty("DailyProductionGoal")
    private double DailyProductionGoal ;
    private int weeklyDemand;
    @DBRef
    private Set<Orders> orders;

    private ProductionPlan productionPlan;
}