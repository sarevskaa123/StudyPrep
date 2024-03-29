package timskiproekt.studyprep.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {

    void deleteByQuizTitle(String title);

}
