package timskiproekt.studyprep.Backend.Model.DTO;

import lombok.Data;

@Data
public class QuestionDto {

    private String questionText;
    private int quizId;
    private String answer1;
    private String answer2;
    private String answer3;
    private String answer4;
    private int answerCorrect;

}
