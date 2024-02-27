package timskiproekt.studyprep.Backend.Service.Implementation;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.Backend.Model.DTO.LoginDTO;
import timskiproekt.studyprep.Backend.Model.User;
import timskiproekt.studyprep.Backend.Model.exceptions.InvalidArgumentsException;
import timskiproekt.studyprep.Backend.Repository.UserRepository;
import timskiproekt.studyprep.Backend.Service.AuthService;

import java.util.Objects;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> login(LoginDTO loginDTO) {
        if (loginDTO.getEmail()==null || loginDTO.getEmail().isEmpty() || loginDTO.getPassword()==null || loginDTO.getPassword().isEmpty()) {
            throw new InvalidArgumentsException();
        }
        User user = userRepository.findByEmail(loginDTO.getEmail());
        if (passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())){
            return Optional.of(user);
        }
        return Optional.empty();
    }


}
