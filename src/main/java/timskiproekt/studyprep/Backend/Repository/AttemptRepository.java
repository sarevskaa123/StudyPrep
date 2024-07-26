package timskiproekt.studyprep.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import timskiproekt.studyprep.Backend.Model.entities.Attempt;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttemptRepository extends JpaRepository<Attempt,Integer> {

    List<Attempt> findAllByUser(Optional<User> u);
    List<Attempt> findAllByQuizOrderByFinalResultDesc(Optional<Quiz> quiz);
//    Optional<Attempt> findById(Integer attemptId);
}
