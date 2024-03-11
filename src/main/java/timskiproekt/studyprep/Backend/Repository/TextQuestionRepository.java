package timskiproekt.studyprep.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.TextQuestion;

import java.util.List;
import java.util.Optional;

public interface TextQuestionRepository extends JpaRepository<TextQuestion,Integer> {
    List<TextQuestion> findByQuiz(Quiz quiz);

    Optional<TextQuestion> findByQuestion(String questionText);

    void deleteByQuestion (String questionText);


}
