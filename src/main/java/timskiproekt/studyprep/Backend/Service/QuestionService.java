package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.DTO.*;
import timskiproekt.studyprep.Backend.Model.entities.*;

import java.util.List;
import java.util.Optional;

public interface QuestionService {

    Optional<Question> addSingleQuestion(SingleChoiceQuestionDto questionDto);
    Optional<Question> addMultipleQuestion(MultipleChoiceQuestionDto questionDto);

    Optional<Question> addTextQuestion(TextQuestionDto questionDto);

    Optional<Question> addBoolQuestion(BoolQuestionDto questionDto);

    Question editSingleQuestion(SingleChoiceQuestionDto questionDto);
    Question editMultipleQuestion(MultipleChoiceQuestionDto questionDto);

    Question editBoolQuestion(BoolQuestionDto questionDto);

    Question editTextQuestion(TextQuestionDto questionDto);

    List<Question> findAll();
    Optional<Question> findById(int id);

    List<Question> findAllQuestionsByQuiz(int quizId);

    Optional<Question> findQuestionById(int questionId);

//    List<QuestionDto> getQuestionsByQuizId(int quizId);

    void deleteQuestionById(int questionId);
}
