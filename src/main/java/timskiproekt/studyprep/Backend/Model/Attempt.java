package timskiproekt.studyprep.Backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class Attempt {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int attemptId;
    private Timestamp startTIme;
    private Timestamp finishTIme;
    private float finalResult;
    private int userId;
    private int quizId;

}
