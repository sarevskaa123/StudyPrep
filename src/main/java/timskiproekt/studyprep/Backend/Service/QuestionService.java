package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.BoolQuestion;
import timskiproekt.studyprep.Backend.Model.DTO.BoolQuestionDto;
import timskiproekt.studyprep.Backend.Model.DTO.QuestionDto;
import timskiproekt.studyprep.Backend.Model.DTO.QuestionMultipleDto;
import timskiproekt.studyprep.Backend.Model.DTO.TextQuestionDto;

import timskiproekt.studyprep.Backend.Model.Question;
import timskiproekt.studyprep.Backend.Model.TextQuestion;

import java.util.List;
import java.util.Optional;

public interface QuestionService {
    Optional<Question> addSinlgeQuestion(QuestionDto questionDto);
    Optional<Question> addMultipleQuestion(QuestionMultipleDto questionMultipleDto);

    List<Question> findAllSingleByQuiz(int id);
    List<Question> findAllMultipleByQuiz(int id);

    void deleteById(int id);
    void deleteByIdBool(int id);
    void deleteByIdText(int id);

    void deleteByQuestionText(String questionText);

    List<Question> findAll();
    Optional<Question> findById(int id);

    Optional<Question> findByQuestionText(String questionText);

    Optional<BoolQuestion> findByQuestionTextBool(String questionText);

    Optional<TextQuestion> findByQuestionTextText(String questionText);

    Optional<BoolQuestion> addBoolQuestion(BoolQuestionDto boolQuestionDto);
    List<BoolQuestion> findAllBoolByQuiz(int id);
    Optional<TextQuestion> addTextQuestion(TextQuestionDto textQuestionDto);

    List<TextQuestion> findAllTextByQuiz(int id);

    List<String> findAllQuestionsByQuiz(int id);


}
