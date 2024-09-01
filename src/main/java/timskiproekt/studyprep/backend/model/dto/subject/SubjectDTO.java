package timskiproekt.studyprep.backend.model.dto.subject;

import lombok.Data;

@Data
public class SubjectDTO {
    private String subjectName;

    public SubjectDTO() {}

    public SubjectDTO(String subjectName) {
        this.subjectName = subjectName;
    }
}
