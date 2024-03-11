package timskiproekt.studyprep.Backend.Model.DTO;

import lombok.Data;
import timskiproekt.studyprep.Backend.Model.enums.Role;

import java.sql.Timestamp;
import java.time.Instant;

@Data
public class RegisterDTO {
    private String username;
    private String email;
    private String password;
    private String repeatPassword;
    private Timestamp registerDate;
    private Role userRole;

    public RegisterDTO(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.registerDate = Timestamp.from(Instant.now());
        this.userRole = Role.NORMAL;
    }

    public RegisterDTO() {
    }
}
