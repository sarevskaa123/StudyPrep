package timskiproekt.studyprep.backend.service.utils;

import timskiproekt.studyprep.backend.model.dto.attempt.AttemptDTO;
import timskiproekt.studyprep.backend.model.dto.attempt.LeaderboardAttemptDTO;
import timskiproekt.studyprep.backend.model.dto.attempt.ProfileAttemptDTO;
import timskiproekt.studyprep.backend.model.dto.quiz.LeaderboardQuizDTO;
import timskiproekt.studyprep.backend.model.entities.Attempt;
import timskiproekt.studyprep.backend.model.entities.Quiz;

import java.util.List;

public interface MapperService {
    List<LeaderboardQuizDTO> mapQuizzesToLeaderboardQuizDTOs(List<Quiz> quiz);
    LeaderboardQuizDTO mapQuizToLeaderboardQuizDTO(Quiz quiz);
    List<ProfileAttemptDTO> mapAttemptsToProfileAttemptDTOs(List<Attempt> attempts);
    List<LeaderboardAttemptDTO> mapAttemptsToLeaderboardAttemptDTOs(List<Attempt> attempts);
    List<AttemptDTO> mapAttemptsToAttemptDTOs(List<Attempt> attempts);
    AttemptDTO mapAttemptToAttemptDTO(Attempt attempt);
}
