package timskiproekt.studyprep.backend.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.backend.model.entities.User;
import timskiproekt.studyprep.backend.exception.model.InvalidArgumentsException;
import timskiproekt.studyprep.backend.exception.model.InvalidUserCredentialsException;
import timskiproekt.studyprep.backend.repository.UserRepository;
import timskiproekt.studyprep.backend.service.AuthService;

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
