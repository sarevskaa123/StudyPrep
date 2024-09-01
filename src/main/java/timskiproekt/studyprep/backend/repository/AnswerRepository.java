package timskiproekt.studyprep.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import timskiproekt.studyprep.backend.model.entities.Answer;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {
}
