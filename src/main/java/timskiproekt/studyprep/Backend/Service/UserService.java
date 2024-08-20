package timskiproekt.studyprep.Backend.Service;

import org.springframework.security.core.userdetails.UserDetailsService;
import timskiproekt.studyprep.Backend.Model.DTO.RegisterDTO;
import timskiproekt.studyprep.Backend.Model.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {
    Optional<User> findById(int id);

    User register(RegisterDTO registerDTO);

    List<User> findAll();
    Optional<User> findByUsername(String username);
}
