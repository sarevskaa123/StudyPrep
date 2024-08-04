package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.DTO.QuizDto;
import timskiproekt.studyprep.Backend.Model.DTO.QuizRatingDto;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;

import java.util.List;
import java.util.Optional;

public interface QuizService {
    List<Quiz> findAll();

    List<QuizRatingDto> findAllWithRatings(int subjectId);

    void deleteById(int id);

    Optional<Quiz> findById(int id);

    Optional<Quiz> save(String quizTitle, String quizDescription, int subjectId, int userId);

    Optional<Quiz> save(QuizDto quizDto);

    Optional<Quiz> edit(int id, String quizTitle, String quizDescription, int subjectId);

    Optional<Quiz> edit(int id, QuizDto quizDto);

    List<Quiz> findBySubjectId(int subjectId);

    Optional<Quiz> addQuizToSubject(int subjectId, QuizDto quizDto);
}
