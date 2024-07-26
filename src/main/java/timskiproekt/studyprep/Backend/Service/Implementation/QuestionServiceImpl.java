package timskiproekt.studyprep.Backend.Service.Implementation;

import org.springframework.stereotype.Service;
import timskiproekt.studyprep.Backend.Model.DTO.BoolQuestionDto;
import timskiproekt.studyprep.Backend.Model.DTO.MultipleChoiceQuestionDto;
import timskiproekt.studyprep.Backend.Model.DTO.SingleChoiceQuestionDto;
import timskiproekt.studyprep.Backend.Model.DTO.TextQuestionDto;
import timskiproekt.studyprep.Backend.Model.entities.*;
import timskiproekt.studyprep.Backend.Repository.QuestionRepository;
import timskiproekt.studyprep.Backend.Repository.QuizRepository;
import timskiproekt.studyprep.Backend.Service.QuestionService;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    public QuestionServiceImpl(QuizRepository quizRepository, QuestionRepository questionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public Optional<Question> addSingleQuestion(SingleChoiceQuestionDto questionDto) {
        Quiz quiz = quizRepository.findById(questionDto.quizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        SingleChoiceQuestion question = new SingleChoiceQuestion(
                questionDto.questionText(),
                questionDto.answerOptions().get(0),
                questionDto.answerOptions().get(1),
                questionDto.answerOptions().get(2),
                questionDto.answerOptions().get(3),
                questionDto.correctAnswer(),
                quiz,
                questionDto.image()
        );

        return Optional.of(questionRepository.save(question));
    }

    @Override
    public Optional<Question> addMultipleQuestion(MultipleChoiceQuestionDto questionDto) {
        Quiz quiz = quizRepository.findById(questionDto.quizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        MultipleChoiceQuestion question = new MultipleChoiceQuestion(
                questionDto.questionText(),
                questionDto.answerOptions().get(0),
                questionDto.answerOptions().get(1),
                questionDto.answerOptions().get(2),
                questionDto.answerOptions().get(3),
                questionDto.isCorrect().get(0),
                questionDto.isCorrect().get(1),
                questionDto.isCorrect().get(2),
                questionDto.isCorrect().get(3),
                quiz,
                questionDto.image()
        );

        return Optional.of(questionRepository.save(question));
    }

    @Override
    public Optional<Question> addBoolQuestion(BoolQuestionDto questionDto) {
        Quiz quiz = quizRepository.findById(questionDto.quizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        BoolQuestion question = new BoolQuestion(
                questionDto.questionText(),
                questionDto.correctAnswer(),
                quiz,
                questionDto.image()
        );

        return Optional.of(questionRepository.save(question));
    }

    @Override
    public Optional<Question> addTextQuestion(TextQuestionDto questionDto) {
        TextQuestion question = new TextQuestion(
                questionDto.questionText(),
                questionDto.correctAnswer(),
                null, // This will be set later
                questionDto.image()
        );

        Optional<Quiz> quizOpt = quizRepository.findById(questionDto.quizId());
        if (quizOpt.isPresent()) {
            question.setQuiz(quizOpt.get());
            questionRepository.save(question);
            return Optional.of(question);
        } else {
            return Optional.empty();
        }
    }


    @Override
    public Question editSingleQuestion(SingleChoiceQuestionDto questionDto) {
        Question oldQuestion = questionRepository.findById(questionDto.questionId()).orElseThrow(
                () -> new RuntimeException("Question not found")
        );

        SingleChoiceQuestion question = new SingleChoiceQuestion(
                questionDto.questionText(),
                questionDto.answerOptions().get(0),
                questionDto.answerOptions().get(1),
                questionDto.answerOptions().get(2),
                questionDto.answerOptions().get(3),
                questionDto.correctAnswer(),
                oldQuestion.getQuiz(),
                questionDto.image()
        );

        oldQuestion.setQuiz(null);
        questionRepository.save(oldQuestion);
        questionRepository.save(question);

        return question;
    }

    @Override
    public Question editMultipleQuestion(MultipleChoiceQuestionDto questionDto) {
        Question oldQuestion = questionRepository.findById(questionDto.questionId()).orElseThrow(
                () -> new RuntimeException("Question not found")
        );

        MultipleChoiceQuestion question = new MultipleChoiceQuestion(
                questionDto.questionText(),
                questionDto.answerOptions().get(0),
                questionDto.answerOptions().get(1),
                questionDto.answerOptions().get(2),
                questionDto.answerOptions().get(3),
                questionDto.isCorrect().get(0),
                questionDto.isCorrect().get(1),
                questionDto.isCorrect().get(2),
                questionDto.isCorrect().get(3),
                oldQuestion.getQuiz(),
                questionDto.image()
        );

        oldQuestion.setQuiz(null);
        questionRepository.save(oldQuestion);
        questionRepository.save(question);

        return question;
    }

    @Override
    public Question editBoolQuestion(BoolQuestionDto questionDto) {
        Question oldQuestion = questionRepository.findById(questionDto.questionId()).orElseThrow(
                () -> new RuntimeException("Question not found")
        );

        BoolQuestion question = new BoolQuestion(
                questionDto.questionText(),
                questionDto.correctAnswer(),
                oldQuestion.getQuiz(),
                questionDto.image()
        );

        oldQuestion.setQuiz(null);
        questionRepository.save(oldQuestion);
        questionRepository.save(question);

        return question;
    }

    @Override
    public Question editTextQuestion(TextQuestionDto questionDto) {
        Question oldQuestion = questionRepository.findById(questionDto.questionId()).orElseThrow(
                () -> new RuntimeException("Question not found")
        );

        TextQuestion question = new TextQuestion(
                questionDto.questionText(),
                questionDto.correctAnswer(),
                oldQuestion.getQuiz(),
                questionDto.image()
        );

        oldQuestion.setQuiz(null);
        questionRepository.save(oldQuestion);
        questionRepository.save(question);

        return question;
    }

    @Override
    public List<Question> findAll() {
        return questionRepository.findAll();
    }

    @Override
    public Optional<Question> findById(int id) {
        return questionRepository.findById(id);
    }

    @Override
    public List<Question> findAllQuestionsByQuiz(int quizId) {
        return questionRepository.findAllByQuizQuizId(quizId);
    }

    @Override
    public Optional<Question> findQuestionById(int questionId) {
        return questionRepository.findById(questionId);
    }

    @Override
    public void deleteQuestionById(int questionId) {
        questionRepository.deleteById(questionId);
    }

    @Override
    public List<Question> getRandomQuestionsForQuiz(int quizId, int count) {
        List<Question> questions = questionRepository.findAllByQuizQuizId(quizId);
        Collections.shuffle(questions);
        return questions.stream().limit(count).collect(Collectors.toList());
    }
}
