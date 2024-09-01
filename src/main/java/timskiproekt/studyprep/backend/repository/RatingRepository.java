package timskiproekt.studyprep.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import timskiproekt.studyprep.backend.model.entities.Rating;
import timskiproekt.studyprep.backend.model.entities.User;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
    List<Rating> findByQuizQuizId(int quizId);
    List<Rating> findByUserId(User user);
    Rating findByQuizQuizIdAndUserIdUserId(int quiz_quizId, int userId_userId);
}
