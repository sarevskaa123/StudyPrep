package timskiproekt.studyprep.Backend.Model.entities;

import javax.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import timskiproekt.studyprep.Backend.Model.enums.QuestionType;

@Data
@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int questionId;
    private String questionText;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "quizId")
    private Quiz quiz;
    @Enumerated(value = EnumType.STRING)
    private QuestionType questionType;


    public Question() {
    }

    public Question(String questionText, Quiz quiz, QuestionType questionType) {
        this.questionText = questionText;
        this.quiz = quiz;
        this.questionType = questionType;
    }
}
