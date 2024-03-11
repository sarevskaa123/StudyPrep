package timskiproekt.studyprep.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import timskiproekt.studyprep.Backend.Model.entities.Attempt;

@Repository
public interface AttemptRepository extends JpaRepository<Attempt,Integer> {
}
