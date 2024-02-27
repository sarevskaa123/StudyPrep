package timskiproekt.studyprep.Backend.Model.DTO;

import lombok.Data;
import timskiproekt.studyprep.Backend.Model.Enum.QuestionType;
import timskiproekt.studyprep.Backend.Model.Quiz;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
