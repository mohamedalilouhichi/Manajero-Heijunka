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
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idUser;
    private String name;
    private String surname;
    private String username;
    private String email;
    private String password;
    private String confirmPassword;


    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<ProductionData> ProductionDatas;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<heijunka.entite.Orders> Orders;
}
