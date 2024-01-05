package timskiproekt.studyprep.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import timskiproekt.studyprep.Backend.Model.Answer;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {
}
