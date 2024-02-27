package timskiproekt.studyprep.Backend.Service;

import org.springframework.security.core.userdetails.UserDetailsService;
import timskiproekt.studyprep.Backend.Model.DTO.LoginDTO;
import timskiproekt.studyprep.Backend.Model.DTO.RegisterDTO;
import timskiproekt.studyprep.Backend.Model.Enum.Role;
import timskiproekt.studyprep.Backend.Model.Response.LoginMessage;
import timskiproekt.studyprep.Backend.Model.User;

import java.util.Optional;

public interface UserService extends UserDetailsService {
    Optional<User> findById(int id);

    Optional<User> register(RegisterDTO registerDTO);
}
