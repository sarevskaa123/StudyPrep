package timskiproekt.studyprep.Backend.Model;

import javax.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;

@Data
@Entity
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int quizId;
    private String quizTitle;
    private String quizDescription;
    private Timestamp quizDateCreated;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    private User userId;
    @ManyToOne
    @JoinColumn(name = "subjectId")
    private Subject subjectId;

    public Quiz(String quizTitle, String quizDescription, Subject subject, User user) {
        this.quizTitle = quizTitle;
        this.quizDescription = quizDescription;
        this.subjectId = subject;
        this.quizDateCreated = Timestamp.from(Instant.now());
        this.userId = user;
    }

    public Quiz() {

    }
}
