package timskiproekt.studyprep.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import timskiproekt.studyprep.backend.model.entities.Quiz;
import timskiproekt.studyprep.backend.model.entities.Subject;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {

    void deleteByQuizTitle(String title);

    List<Quiz> findBySubject(Subject subject);
}
