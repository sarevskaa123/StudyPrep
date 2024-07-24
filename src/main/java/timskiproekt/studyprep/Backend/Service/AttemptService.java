package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.entities.Attempt;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.User;

import java.util.List;
import java.util.Optional;

public interface AttemptService {
    List<Attempt> UserAttempts(User u);
    Optional<List<Attempt>> findAllBySubjectId(Optional<Quiz> quiz);

    Attempt saveAttempt(Attempt attempt);

}
