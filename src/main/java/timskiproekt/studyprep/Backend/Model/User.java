package timskiproekt.studyprep.Backend.Model;

import jakarta.persistence.*;
import lombok.Data;
import timskiproekt.studyprep.Backend.Model.Enum.Role;

import java.sql.Timestamp;

@Entity
@Data

public class User {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int userId;
    private String username;
    private String email;
    private String password;
    private Timestamp registerDate;
    @Enumerated(EnumType.STRING)
    private Role userRole;


}
