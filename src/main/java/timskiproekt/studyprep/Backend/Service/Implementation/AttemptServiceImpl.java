package timskiproekt.studyprep.Backend.Service.Implementation;

import org.springframework.stereotype.Service;
import timskiproekt.studyprep.Backend.Model.entities.Attempt;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.Subject;
import timskiproekt.studyprep.Backend.Model.entities.User;
import timskiproekt.studyprep.Backend.Repository.AttemptRepository;
import timskiproekt.studyprep.Backend.Repository.SubjectRepository;
import timskiproekt.studyprep.Backend.Repository.UserRepository;
import timskiproekt.studyprep.Backend.Service.AttemptService;

import java.util.List;
import java.util.Optional;

@Service
public class AttemptServiceImpl implements AttemptService {
    private final UserRepository userRepository;
    private final AttemptRepository attemptRepository;
    private final SubjectRepository subjectRepository;

    public AttemptServiceImpl(UserRepository userRepository, AttemptRepository attemptRepository, SubjectRepository subjectRepository) {
        this.userRepository = userRepository;
        this.attemptRepository = attemptRepository;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public Optional<List<Attempt>> UserAttempts(Optional<User> u) {
        return Optional.ofNullable(attemptRepository.findAllByUser(u));
    }

    @Override
    public Optional<List<Attempt>> findAllBySubjectId(Optional<Quiz> quiz) {
        return Optional.ofNullable(attemptRepository.findAllByQuizOrderByFinalResultDesc(quiz));
    }
}
