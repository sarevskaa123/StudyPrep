package timskiproekt.studyprep.backend.service;

import timskiproekt.studyprep.backend.model.DTO.quiz.CommentDTO;
import timskiproekt.studyprep.backend.model.entities.Comment;
import timskiproekt.studyprep.backend.model.entities.Rating;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    List<Comment> findByQuiz(int quizId);
    Optional<Comment> save(CommentDTO commentDTO);
    void deleteCommentById(int commentId);
}
