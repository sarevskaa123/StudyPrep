package timskiproekt.studyprep.backend.service;

import timskiproekt.studyprep.backend.model.dto.attempt.AttemptDTO;
import timskiproekt.studyprep.backend.model.dto.attempt.LeaderboardAttemptDTO;
import timskiproekt.studyprep.backend.model.dto.attempt.ProfileAttemptDTO;
import timskiproekt.studyprep.backend.model.entities.Attempt;
import timskiproekt.studyprep.backend.model.entities.Quiz;
import timskiproekt.studyprep.backend.model.entities.User;

import java.util.List;

public interface AttemptService {
    List<ProfileAttemptDTO> getUserAttempts(User u);
    AttemptDTO findById(int attemptId);
    List<LeaderboardAttemptDTO> leaderboardFindAll(Quiz quiz);

    Attempt saveAttempt(Attempt attempt);
}
