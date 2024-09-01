package timskiproekt.studyprep.backend.model.dto.user;

import lombok.Data;
import timskiproekt.studyprep.backend.model.enums.Role;
import timskiproekt.studyprep.backend.model.entities.User;


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
