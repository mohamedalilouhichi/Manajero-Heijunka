package heijunka.entite;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "orders")
public class Orders {
    @Id
    @JsonProperty("orderId")
    private String idOrder;

    @JsonProperty("orderName")
    private String orderName;

    @JsonProperty("quantity")
    private int quantity;

    @JsonProperty("product")
    @DBRef
    private Product product;
}
