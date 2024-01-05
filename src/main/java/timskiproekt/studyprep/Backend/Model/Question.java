package timskiproekt.studyprep.Backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Question {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int questionId;
    private String questionText;
    private int quizId;
}
