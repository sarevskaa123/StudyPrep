package timskiproekt.studyprep.Backend.Model.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;

// Represents a generic question. Each specific type of question will extend this model.

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@AllArgsConstructor
public abstract class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int questionId;
    private String questionText;
    private String questionType; // text, single, multiple, bool


    @ManyToOne
    @JoinColumn(name = "quiz_id")
    @JsonBackReference
    private Quiz quiz;

    public Question(String questionText, String questionType, Quiz quiz) {
        this.questionText = questionText;
        this.questionType = questionType;
        this.quiz = quiz;
    }


    public Question() {

    }
}

