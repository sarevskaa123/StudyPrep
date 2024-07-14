package timskiproekt.studyprep.Backend.Service.Implementation;

import org.springframework.stereotype.Service;
import timskiproekt.studyprep.Backend.Model.entities.Attempt;
import timskiproekt.studyprep.Backend.Model.entities.User;
import timskiproekt.studyprep.Backend.Repository.AttemptRepository;
import timskiproekt.studyprep.Backend.Repository.UserRepository;
import timskiproekt.studyprep.Backend.Service.AttemptService;

import java.util.List;
import java.util.Optional;

@Service
public class AttemptServiceImpl implements AttemptService {
    private final UserRepository userRepository;
    private final AttemptRepository attemptRepository;

    public AttemptServiceImpl(UserRepository userRepository, AttemptRepository attemptRepository) {
        this.userRepository = userRepository;
        this.attemptRepository = attemptRepository;
    }

    @Override
    public Optional<List<Attempt>> UserAttempts(Optional<User> u) {
        return Optional.ofNullable(attemptRepository.findAllByUser(u));
    }
}
