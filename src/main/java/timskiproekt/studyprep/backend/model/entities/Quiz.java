package timskiproekt.studyprep.backend.model.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int quizId;
    private String quizTitle;
    private String quizDescription;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "userId")
    private User userId;
    @ManyToOne
    @JoinColumn(name = "subjectId")
    private Subject subject;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Question> questions;

    public Quiz(String quizTitle, String quizDescription, Subject subject, User user) {
        this.quizTitle = quizTitle;
        this.quizDescription = quizDescription;
        this.subject = subject;
        this.userId = user;
    }

    public Quiz() {

    }

    public void setSubjectId(Subject subject) {
        this.subject=subject;
    }
}
