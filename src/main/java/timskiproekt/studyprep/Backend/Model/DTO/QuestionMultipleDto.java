package timskiproekt.studyprep.Backend.Model.DTO;

import lombok.Data;

import java.util.List;

@Data
public class QuestionMultipleDto {

    private String questionText;
    private int quizId;
    private String answer1;
    private String answer2;
    private String answer3;
    private String answer4;
    private Boolean checked1;
    private Boolean checked2;
    private Boolean checked3;
    private Boolean checked4;

}
