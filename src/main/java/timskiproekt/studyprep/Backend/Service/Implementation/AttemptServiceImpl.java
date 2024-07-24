package timskiproekt.studyprep.Backend.Service.Implementation;

import org.springframework.stereotype.Service;
import timskiproekt.studyprep.Backend.Model.entities.Attempt;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.User;
import timskiproekt.studyprep.Backend.Repository.AttemptRepository;
import timskiproekt.studyprep.Backend.Repository.SubjectRepository;
import timskiproekt.studyprep.Backend.Repository.UserRepository;
import timskiproekt.studyprep.Backend.Service.AttemptService;

import java.util.List;
import java.util.Optional;

@Service
public class AttemptServiceImpl implements AttemptService {
    private final AttemptRepository attemptRepository;

    public AttemptServiceImpl(AttemptRepository attemptRepository) {
        this.attemptRepository = attemptRepository;
    }

    @Override
    public List<Attempt> UserAttempts(User u) {
        return attemptRepository.findAllByUser(Optional.ofNullable(u));
    }

    @Override
    public Optional<List<Attempt>> findAllBySubjectId(Optional<Quiz> quiz) {
        return Optional.ofNullable(attemptRepository.findAllByQuizOrderByFinalResultDesc(quiz));
    }

    @Override
    public Attempt saveAttempt(Attempt attempt) {
        return attemptRepository.save(attempt);
    }
}
