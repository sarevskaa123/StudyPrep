package timskiproekt.studyprep.backend.model.entities;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.Type;

// Represents a generic question. Each specific type of question will extend this model.

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@AllArgsConstructor
public abstract class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int questionId;
    private String questionText;
    private String questionType; // text, single, multiple, bool
    @Lob
    @Type(type="org.hibernate.type.BinaryType")
    @Column(name = "image")
    private byte[] image;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    @JsonBackReference
    private Quiz quiz;

    public Question(String questionText, String questionType, Quiz quiz, byte[] image) {
        this.questionText = questionText;
        this.questionType = questionType;
        this.quiz = quiz;
        this.image = image;
    }

    public Question() {

    }
}
