package timskiproekt.studyprep.backend.service;

import timskiproekt.studyprep.backend.model.dto.quiz.RatingDto;
import timskiproekt.studyprep.backend.model.entities.Rating;

import java.util.List;
import java.util.Optional;

public interface RatingService {
    List<Rating> findByQuiz(int quizId);
    List<Rating> findByUser(int userId);

    Optional<Rating> save(RatingDto ratingDto);
    Boolean findByQuizAndUser(int quizId,int userId);
}
