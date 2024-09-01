package timskiproekt.studyprep.backend.model.dto.attempt;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class QuestionAttemptDTO {
    private String questionText;
    private byte[] image;
    private List<String> correctAnswer;
    private List<String> userAnswers;
    private boolean isCorrect;
    private float points;
}
