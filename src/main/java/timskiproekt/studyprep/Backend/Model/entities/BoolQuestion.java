package timskiproekt.studyprep.Backend.Model.entities;


import javax.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
public class BoolQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boolQuestionId;
    private String boolQuestionText;
    private Boolean isCorrect;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "quizId")
    private Quiz quiz;

    public BoolQuestion(String boolQuestionText, Boolean isCorrect, Quiz quiz) {
        this.boolQuestionText = boolQuestionText;
        this.isCorrect = isCorrect;
        this.quiz = quiz;
    }

    public BoolQuestion() {
    }
}
