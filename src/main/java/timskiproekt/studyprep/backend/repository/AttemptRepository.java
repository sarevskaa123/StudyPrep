package timskiproekt.studyprep.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import timskiproekt.studyprep.backend.model.entities.Attempt;
import timskiproekt.studyprep.backend.model.entities.Quiz;
import timskiproekt.studyprep.backend.model.entities.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttemptRepository extends JpaRepository<Attempt,Integer> {

    List<Attempt> findAllByUser(User u);
    List<Attempt> findAllByQuizOrderByFinalResultDesc(Quiz quiz);
//    Optional<Attempt> findById(Integer attemptId);
}
