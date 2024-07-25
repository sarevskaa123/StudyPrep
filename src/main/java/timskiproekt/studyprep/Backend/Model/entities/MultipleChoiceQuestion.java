package timskiproekt.studyprep.Backend.Model.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@Entity
@AllArgsConstructor
public class MultipleChoiceQuestion extends Question {
    private String answerOption1;
    private String answerOption2;
    private String answerOption3;
    private String answerOption4;
    private boolean isCorrect1;
    private boolean isCorrect2;
    private boolean isCorrect3;
    private boolean isCorrect4;

    public MultipleChoiceQuestion(String questionText, String answerOption1, String answerOption2, String answerOption3, String answerOption4, boolean isCorrect1, boolean isCorrect2, boolean isCorrect3, boolean isCorrect4, Quiz quiz, byte[] image) {
        super(questionText, "Multiple", quiz, image);
        this.answerOption1 = answerOption1;
        this.answerOption2 = answerOption2;
        this.answerOption3 = answerOption3;
        this.answerOption4 = answerOption4;
        this.isCorrect1 = isCorrect1;
        this.isCorrect2 = isCorrect2;
        this.isCorrect3 = isCorrect3;
        this.isCorrect4 = isCorrect4;
    }

    public MultipleChoiceQuestion() {
    }
}
