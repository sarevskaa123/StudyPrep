package timskiproekt.studyprep.backend.service;

import timskiproekt.studyprep.backend.model.dto.quiz.LeaderboardQuizDTO;
import timskiproekt.studyprep.backend.model.dto.quiz.QuizDTO;
import timskiproekt.studyprep.backend.model.dto.quiz.QuizRatingDto;
import timskiproekt.studyprep.backend.model.entities.Quiz;

import java.util.List;
import java.util.Optional;

public interface QuizService {
    List<Quiz> findAll();

    List<LeaderboardQuizDTO> leaderboardFindAll();

    List<QuizRatingDto> findAllWithRatings(int subjectId);

    void deleteById(int id);

    Optional<Quiz> findById(int id);

    LeaderboardQuizDTO leaderboardFindById(int id);

    Optional<Quiz> save(String quizTitle, String quizDescription, int subjectId, int userId);

    Optional<Quiz> save(QuizDTO quizDto);

    Optional<Quiz> edit(int id, String quizTitle, String quizDescription, int subjectId);

    Optional<Quiz> edit(int id, QuizDTO quizDto);

    List<Quiz> findBySubjectId(int subjectId);

    Optional<Quiz> addQuizToSubject(int subjectId, QuizDTO quizDto);
}
