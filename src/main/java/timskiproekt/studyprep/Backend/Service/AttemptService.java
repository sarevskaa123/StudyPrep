package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.DTO.AttemptDTO;
import timskiproekt.studyprep.Backend.Model.entities.Attempt;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.User;

import java.util.List;
import java.util.Optional;

public interface AttemptService {
    List<Attempt> UserAttempts(User u);
    AttemptDTO FindById(int attemptId);
    Optional<List<Attempt>> findAllBySubjectId(Optional<Quiz> quiz);

    Attempt saveAttempt(Attempt attempt);

    Optional<Attempt> findById(int attemptId);
}
