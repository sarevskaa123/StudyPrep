package timskiproekt.studyprep.Backend.Model.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@Entity
@AllArgsConstructor
public class TextQuestion extends Question {
    private String correctAnswer;

    public TextQuestion(String questionText, String correctAnswer, Quiz quiz) {
        super(questionText, "Text", quiz);
        this.correctAnswer = correctAnswer;
    }

    public TextQuestion() {
    }
}

