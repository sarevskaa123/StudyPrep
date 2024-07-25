package timskiproekt.studyprep.Backend.Model.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@Entity
@AllArgsConstructor
public class TextQuestion extends Question {
    private String correctAnswer;

    public TextQuestion(String questionText, String correctAnswer, Quiz quiz, byte[] image) {
        super(questionText, "Text", quiz, image);
        this.correctAnswer = correctAnswer;
    }

    public TextQuestion() {
    }
}
