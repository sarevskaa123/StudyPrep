package timskiproekt.studyprep.Backend.Model.DTO;

import lombok.Data;
import timskiproekt.studyprep.Backend.Model.Enum.Role;
import timskiproekt.studyprep.Backend.Model.User;


@Data
public class UserDetailsDto {
    private String username;
    private Role role;
    private String email;


    public static UserDetailsDto of(User user){
        UserDetailsDto details = new UserDetailsDto();
        details.username = user.getUsername();
        details.role = user.getUserRole();
        details.email = user.getEmail();
        return details;
    }
}
