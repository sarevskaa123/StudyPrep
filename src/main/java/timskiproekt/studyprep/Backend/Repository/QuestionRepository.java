package timskiproekt.studyprep.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import timskiproekt.studyprep.Backend.Model.enums.QuestionType;
import timskiproekt.studyprep.Backend.Model.entities.Question;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    List<Question> findAllByQuizAndQuestionType(Quiz quiz, QuestionType questionType);
    List<Question> findAllByQuiz(Quiz quiz);

    Optional<Question> findByQuestionText(String questionText);

    void deleteByQuestionText(String questionText);


}
