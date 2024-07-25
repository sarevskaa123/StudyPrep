package timskiproekt.studyprep.Backend.Model.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@Entity
@AllArgsConstructor
public class SingleChoiceQuestion extends Question {
    private String answerOption1;
    private String answerOption2;
    private String answerOption3;
    private String answerOption4;
    private String correctAnswer;

    public SingleChoiceQuestion(String questionText, String answerOption1, String answerOption2, String answerOption3, String answerOption4, String correctAnswer, Quiz quiz, byte[] image) {
        super(questionText, "Single", quiz, image);
        this.answerOption1 = answerOption1;
        this.answerOption2 = answerOption2;
        this.answerOption3 = answerOption3;
        this.answerOption4 = answerOption4;
        this.correctAnswer = correctAnswer;
    }

    public SingleChoiceQuestion() {
    }
}
