package timskiproekt.studyprep.backend.model.entities;

import javax.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int answerId;
    private String answerText;
    private Boolean isCorrect;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "questionId")
    private Question question;


    public Answer(String answerText, Boolean isCorrect, Question question) {
        this.answerText = answerText;
        this.isCorrect = isCorrect;
        this.question = question;
    }

    public Answer() {
    }
}
