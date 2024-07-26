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
    private Boolean correctAnswer;

    public BoolQuestion(String questionText, Boolean correctAnswer, Quiz quiz, byte[] image) {
        super(questionText, "Bool", quiz, image);
        this.correctAnswer = correctAnswer;
    }

    public BoolQuestion() {
    }
}
