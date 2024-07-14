package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.entities.Attempt;
import timskiproekt.studyprep.Backend.Model.entities.User;

import java.util.List;
import java.util.Optional;

public interface AttemptService {
    public Optional<List<Attempt>> UserAttempts(Optional<User> u);
}
