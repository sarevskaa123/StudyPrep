package timskiproekt.studyprep.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import timskiproekt.studyprep.Backend.Model.entities.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {
}
