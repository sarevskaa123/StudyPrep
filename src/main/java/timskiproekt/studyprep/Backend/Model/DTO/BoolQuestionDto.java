package timskiproekt.studyprep.Backend.Model.DTO;

import lombok.Data;

@Data
public class BoolQuestionDto {
    private String questionText;
    private int quizId;
    private Boolean isCorrect;

}
