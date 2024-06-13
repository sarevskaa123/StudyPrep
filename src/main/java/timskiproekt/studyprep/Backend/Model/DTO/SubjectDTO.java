package timskiproekt.studyprep.Backend.Model.DTO;

import lombok.Data;

@Data
public class SubjectDTO {
    private String subjectName;

    public SubjectDTO() {}

    public SubjectDTO(String subjectName) {
        this.subjectName = subjectName;
    }
}
