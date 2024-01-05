package timskiproekt.studyprep.Backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Time;
import java.sql.Timestamp;

@Entity
@Data
public class Quiz {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int quizId;
    private String quizTitle;
    private String quizDescription;
    private Timestamp quizDateCreated;
    private int userId;
    private int subjectId;
}
