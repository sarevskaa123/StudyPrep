package timskiproekt.studyprep.backend.model.DTO.quiz;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class CommentDTO {
    public int quizId;
    public int userId;
    public String commentText;
}
