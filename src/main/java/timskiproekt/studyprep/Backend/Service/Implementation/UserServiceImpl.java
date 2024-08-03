package timskiproekt.studyprep.Backend.Service.Implementation;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.Backend.Model.DTO.RegisterDTO;
import timskiproekt.studyprep.Backend.Model.entities.User;
import timskiproekt.studyprep.Backend.Model.exceptions.PasswordsDoNotMatchException;
import timskiproekt.studyprep.Backend.Model.exceptions.UserAlreadyRegisteredWithEmailException;
import timskiproekt.studyprep.Backend.Model.exceptions.UsernameAlreadyExistsException;
import timskiproekt.studyprep.Backend.Repository.UserRepository;
import timskiproekt.studyprep.Backend.Service.UserService;

import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findByUsername(s).orElseThrow(()->new UsernameNotFoundException(s));
    }


    @Override
    public Optional<User> findById(int id) {
        return userRepository.findById(id);
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

}
