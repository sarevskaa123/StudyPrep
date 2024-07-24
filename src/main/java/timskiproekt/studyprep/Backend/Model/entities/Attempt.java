package timskiproekt.studyprep.Backend.Model.entities;

import javax.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.sql.Timestamp;

@Data
@Entity
public class Attempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attempt_id")
    private int attemptId;
    @Column(name = "start_time")
    private Timestamp startTime;
    @Column(name = "finish_time")
    private Timestamp finishTime;
    @Column(name = "final_result")
    private float finalResult;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    private User user;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "quizId")
    private Quiz quiz;
}
