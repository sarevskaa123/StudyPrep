package timskiproekt.studyprep.Backend.Model.DTO;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class QuestionDto {
    private final String questionText;
    private final String questionType;
    private final int quizId;
    private final int questionId;
}
