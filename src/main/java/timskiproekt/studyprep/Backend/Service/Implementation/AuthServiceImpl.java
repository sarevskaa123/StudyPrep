package timskiproekt.studyprep.Backend.Service.Implementation;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.Backend.Model.User;
import timskiproekt.studyprep.Backend.Model.exceptions.InvalidArgumentsException;
import timskiproekt.studyprep.Backend.Model.exceptions.InvalidUserCredentialsException;
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
    public User login(String username,String password) {
        if (username==null || username.isEmpty() || password==null || password.isEmpty()) {
            throw new InvalidArgumentsException();
        }

        return userRepository.findByUsernameAndPassword(username,
                password).orElseThrow(InvalidUserCredentialsException::new);


    }


}
