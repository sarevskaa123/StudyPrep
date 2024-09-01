package timskiproekt.studyprep.backend.model.entities;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Data
@Entity
@TypeDef(name = "json", typeClass = JsonType.class)
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
    @Type(type = "json")
    @Column(name = "history_quiz", columnDefinition = "jsonb")
    private List<HistoryQuestion> historyQuiz;


    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    private User user;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "quizId")
    private Quiz quiz;
}
