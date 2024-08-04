package timskiproekt.studyprep.Backend.Model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;

@Data
@AllArgsConstructor
public class QuizRatingDto {
    public Quiz quiz;
    public int totalTimesRated;
    public double averageRating;
}
