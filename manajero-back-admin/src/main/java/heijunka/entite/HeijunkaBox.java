package heijunka.entite;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "heijunka_box")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeijunkaBox {
    @Id
    @JsonProperty("idBox")
    private String idBox;
    @JsonProperty("title")

    private String title;

    @JsonProperty("timestamp")
    private Date timestamp;

    @JsonProperty("schedule")
    private List<ScheduleEntry> scheduleEntries;
    @JsonProperty("notes")

    private String notes;

    @JsonProperty("image")
    private String image;

    @JsonProperty("archived")
    private boolean archived;
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ScheduleEntry {
        @JsonProperty("Day")
        private String day;

        @JsonProperty("Product")
        private String product;

        @JsonProperty("ProductionQuantity")
        private Integer productionQuantity;

        @JsonProperty("TimeSlot")
        private String timeSlot;
    }

}
