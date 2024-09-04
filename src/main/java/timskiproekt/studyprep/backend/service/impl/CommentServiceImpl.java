package timskiproekt.studyprep.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.backend.model.DTO.quiz.CommentDTO;
import timskiproekt.studyprep.backend.model.entities.Comment;
import timskiproekt.studyprep.backend.model.entities.Quiz;
import timskiproekt.studyprep.backend.model.entities.Rating;
import timskiproekt.studyprep.backend.model.entities.User;
import timskiproekt.studyprep.backend.repository.CommentRepository;
import timskiproekt.studyprep.backend.repository.QuizRepository;
import timskiproekt.studyprep.backend.repository.UserRepository;
import timskiproekt.studyprep.backend.service.CommentService;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Comment> findByQuiz(int quizId) {
        Quiz q = quizRepository.findById(quizId).orElseThrow(RuntimeException::new);
        return commentRepository.findByQuizQuizId(quizId);
    }

    @Override
    public Optional<Comment> save(CommentDTO commentDTO) {
        Quiz quiz = quizRepository.findById(commentDTO.quizId).orElseThrow(RuntimeException::new);
        User user = userRepository.findById(commentDTO.userId).orElseThrow(RuntimeException::new);

        Comment comment = new Comment(commentDTO.commentText, user, quiz);
        commentRepository.save(comment);

        return Optional.of(comment);
    }

    @Override
    public void deleteCommentById(int commentId) {
        commentRepository.deleteById(commentId);
    }
}
