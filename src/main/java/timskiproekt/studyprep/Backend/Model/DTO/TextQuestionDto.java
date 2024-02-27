package timskiproekt.studyprep.Backend.Model.DTO;

import lombok.Data;

@Data
public class TextQuestionDto {
    private String questionText;
    private String answerText;
    private int quizId;
}
