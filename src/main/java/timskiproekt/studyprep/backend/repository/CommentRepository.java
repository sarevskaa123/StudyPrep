package timskiproekt.studyprep.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import timskiproekt.studyprep.backend.model.entities.Comment;
import timskiproekt.studyprep.backend.model.entities.Rating;

import java.util.List;

public interface CommentRepository  extends JpaRepository<Comment, Integer> {
    List<Comment> findByQuizQuizId(int quizId);
}
