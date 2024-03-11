package timskiproekt.studyprep.Backend.Model.entities;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int subjectId;
    private String subjectName;
}
