package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.DTO.QuizDto;
import timskiproekt.studyprep.Backend.Model.Quiz;

import java.util.List;
import java.util.Optional;

public interface QuizService {
    List<Quiz> findAll();

    void deleteById(int id);

    Optional<Quiz> findById(int id);

    Optional<Quiz> save(String quizTitle, String quizDescription, int subjectId);

    Optional<Quiz> save(QuizDto quizDto);

    Optional<Quiz> edit(int id, String quizTitle, String quizDescription, int subjectId);

    Optional<Quiz> edit(int id, QuizDto quizDto);


}
