package timskiproekt.studyprep.Backend.Model.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@Entity
@AllArgsConstructor
public class BoolQuestion extends Question {
    private boolean correctAnswer;

    public BoolQuestion(String questionText, boolean correctAnswer, Quiz quiz, byte[] image) {
        super(questionText, "Bool", quiz, image);
        this.correctAnswer = correctAnswer;
    }

    public BoolQuestion() {
    }
}
