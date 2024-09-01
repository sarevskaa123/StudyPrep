package timskiproekt.studyprep.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import timskiproekt.studyprep.backend.model.entities.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUserId(int id);

    Optional<User> findByUsernameAndPassword(String username, String password);

    @Query(value = "SELECT u FROM User u WHERE u.username = :username OR u.email = :email")
    Optional<User> findByUsernameOrEmail(String username, String email);

    Optional<User> findByUsername(String username);
}
