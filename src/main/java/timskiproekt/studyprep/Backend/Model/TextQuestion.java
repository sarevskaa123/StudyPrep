package timskiproekt.studyprep.Backend.Model;


import javax.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
public class TextQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int textQuestionId;
    private String question;
    private String answerText;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "quizId")
    private Quiz quiz;

    public TextQuestion(String question, String answerText, Quiz quiz) {
        this.question = question;
        this.answerText = answerText;
        this.quiz = quiz;
    }

    public TextQuestion(){}
}
