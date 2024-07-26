package timskiproekt.studyprep.Backend.Model.DTO;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
public class AttemptDTO {
    private List<QuestionAttemptDTO> questions;
    private String subjectName;
    private String quizName;
    private Timestamp startTime;
    private Timestamp finishTime;
    private float finalResult;
    private float maxPoints;
}
