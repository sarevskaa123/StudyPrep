package timskiproekt.studyprep.backend.service;

import timskiproekt.studyprep.backend.model.dto.question.BoolQuestionDto;
import timskiproekt.studyprep.backend.model.dto.question.MultipleChoiceQuestionDto;
import timskiproekt.studyprep.backend.model.dto.question.SingleChoiceQuestionDto;
import timskiproekt.studyprep.backend.model.dto.question.TextQuestionDto;
import timskiproekt.studyprep.backend.model.entities.*;

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

    List<Question> getRandomQuestionsForQuiz(int quizId, int count);
}
