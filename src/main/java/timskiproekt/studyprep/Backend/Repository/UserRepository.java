package timskiproekt.studyprep.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import timskiproekt.studyprep.Backend.Model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
