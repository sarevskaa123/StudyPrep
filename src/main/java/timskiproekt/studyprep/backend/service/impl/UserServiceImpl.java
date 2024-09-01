package timskiproekt.studyprep.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.backend.exception.model.UserNotFoundException;
import timskiproekt.studyprep.backend.model.dto.attempt.AttemptDTO;
import timskiproekt.studyprep.backend.model.dto.attempt.ProfileAttemptDTO;
import timskiproekt.studyprep.backend.model.dto.user.RegisterDTO;
import timskiproekt.studyprep.backend.model.dto.user.UserProfileDTO;
import timskiproekt.studyprep.backend.model.entities.User;
import timskiproekt.studyprep.backend.exception.model.PasswordsDoNotMatchException;
import timskiproekt.studyprep.backend.exception.model.UserAlreadyRegisteredWithEmailException;
import timskiproekt.studyprep.backend.exception.model.UsernameAlreadyExistsException;
import timskiproekt.studyprep.backend.repository.AttemptRepository;
import timskiproekt.studyprep.backend.repository.UserRepository;
import timskiproekt.studyprep.backend.service.AttemptService;
import timskiproekt.studyprep.backend.service.UserService;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final AttemptService attemptService;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findByUsername(s).orElseThrow(()->new UsernameNotFoundException(s));
    }


    @Override
    public Optional<User> findById(int id) {
        return userRepository.findById(id);
    }

    @Override
    public UserProfileDTO findProfile(int id) {
       return userRepository.findById(id).map(
                user -> {
                    List<ProfileAttemptDTO> attempts = attemptService.getUserAttempts(user);
                    return new UserProfileDTO(
                            user.getUsername(),
                            user.getRegisterDate(),
                            user.getEmail(),
                            attempts
                    );
                }
        ).orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public User register(RegisterDTO registerDTO) {
        if (!registerDTO.getPassword().equals(registerDTO.getRepeatPassword()))
            throw new PasswordsDoNotMatchException();
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(registerDTO.getUsername(), registerDTO.getEmail());
        if (userOptional.isPresent()) {
            User userExists = userOptional.get();
            final String registerEmail = registerDTO.getEmail();
            final String registerUsername = registerDTO.getUsername();
            if (userExists.getEmail().equals(registerEmail)) {
                throw new UserAlreadyRegisteredWithEmailException(registerEmail);
            } else if (userExists.getUsername().equals(registerUsername)) {
                throw new UsernameAlreadyExistsException(registerUsername);
            }
        }
        User user = new User(registerDTO.getUsername(),registerDTO.getEmail(),passwordEncoder.encode(registerDTO.getPassword()));
        userRepository.save(user);
        return user;
    }
    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
