package timskiproekt.studyprep.Backend.Model.DTO;


import lombok.Data;

@Data
public class LoginDTO {

    private String email;
    private String password;

    public LoginDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public LoginDTO() {
    }
}
