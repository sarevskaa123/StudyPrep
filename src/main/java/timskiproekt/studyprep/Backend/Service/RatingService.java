package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.DTO.QuizDto;
import timskiproekt.studyprep.Backend.Model.DTO.RatingDto;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.Rating;
import timskiproekt.studyprep.Backend.Model.entities.User;

import java.util.List;
import java.util.Optional;

public interface RatingService {
    List<Rating> findByQuiz(int quizId);
    List<Rating> findByUser(int userId);

    Optional<Rating> save(RatingDto ratingDto);
    Boolean findByQuizAndUser(int quizId,int userId);
}
