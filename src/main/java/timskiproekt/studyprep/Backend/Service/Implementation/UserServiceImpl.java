package timskiproekt.studyprep.Backend.Service.Implementation;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.Backend.Model.DTO.RegisterDTO;
import timskiproekt.studyprep.Backend.Model.entities.User;
import timskiproekt.studyprep.Backend.Model.exceptions.InvalidUsernameOrPasswordException;
import timskiproekt.studyprep.Backend.Model.exceptions.PasswordsDoNotMatchException;
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
    public Optional<User> register(RegisterDTO registerDTO) {
        if (registerDTO.getUsername()==null || registerDTO.getUsername().isEmpty()
                || registerDTO.getPassword()==null || registerDTO.getPassword().isEmpty())
            throw new InvalidUsernameOrPasswordException();
        if (!registerDTO.getPassword().equals(registerDTO.getRepeatPassword()))
            throw new PasswordsDoNotMatchException();
        if(this.userRepository.findByUsername(registerDTO.getUsername()).isPresent())
            throw new UsernameAlreadyExistsException(registerDTO.getUsername());
        User user = new User(registerDTO.getUsername(),registerDTO.getEmail(),passwordEncoder.encode(registerDTO.getPassword()));
        userRepository.save(user);
        return Optional.of(user);
    }

}
