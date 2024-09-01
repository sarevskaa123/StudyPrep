package timskiproekt.studyprep.backend.model.dto.attempt;

import java.sql.Timestamp;


public record LeaderboardAttemptDTO(
        String username,
        Timestamp startTime,
        Timestamp finishTime,
        float finalResult
) {
}
