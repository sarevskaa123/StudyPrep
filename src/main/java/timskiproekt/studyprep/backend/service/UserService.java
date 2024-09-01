package timskiproekt.studyprep.backend.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import timskiproekt.studyprep.backend.model.dto.user.RegisterDTO;
import timskiproekt.studyprep.backend.model.dto.user.UserProfileDTO;
import timskiproekt.studyprep.backend.model.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {
    Optional<User> findById(int id);

    UserProfileDTO findProfile(int id);

    User register(RegisterDTO registerDTO);

    List<User> findAll();
    Optional<User> findByUsername(String username);
}
