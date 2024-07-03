package heijunka.entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jdk.jshell.Snippet;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

    @OneToMany(cascade = CascadeType.ALL)
    private Set<ProductionData> productionDatas;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<ProductionPlan> ProductionPlans;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<Order > Orders;


}
