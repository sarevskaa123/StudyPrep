package timskiproekt.studyprep.Backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Subject {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int subjectId;
    private String subjectName;
}
