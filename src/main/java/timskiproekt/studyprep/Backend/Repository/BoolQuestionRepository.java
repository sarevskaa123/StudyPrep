package timskiproekt.studyprep.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import timskiproekt.studyprep.Backend.Model.BoolQuestion;
import timskiproekt.studyprep.Backend.Model.Question;
import timskiproekt.studyprep.Backend.Model.Quiz;
import timskiproekt.studyprep.Backend.Model.TextQuestion;

import java.util.List;
import java.util.Optional;

public interface BoolQuestionRepository extends JpaRepository<BoolQuestion, Integer> {

    List<BoolQuestion> findByQuiz(Quiz quiz);
    Optional<BoolQuestion> findByBoolQuestionText(String questionText);

    void deleteByBoolQuestionText(String questionText);



}
