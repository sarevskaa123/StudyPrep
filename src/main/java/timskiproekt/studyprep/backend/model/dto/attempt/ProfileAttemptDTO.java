package timskiproekt.studyprep.backend.model.dto.attempt;

import java.sql.Timestamp;


public record ProfileAttemptDTO(
        int id,
        String quizTitle,
        String subjectName,
        Timestamp startTime,
        Timestamp finishTime,
        float finalResult
) {
}
