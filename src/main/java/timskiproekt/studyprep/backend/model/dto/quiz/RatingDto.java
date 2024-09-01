package timskiproekt.studyprep.backend.model.dto.quiz;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class RatingDto {
    public int quizId;
    public int userId;
    public int ratingScore;
}
