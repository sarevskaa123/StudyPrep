package timskiproekt.studyprep.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.Rating;
import timskiproekt.studyprep.Backend.Model.entities.User;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
    List<Rating> findByQuizQuizId(int quizId);
    List<Rating> findByUserId(User user);
    Rating findByQuizQuizIdAndUserIdUserId(int quiz_quizId, int userId_userId);
}
