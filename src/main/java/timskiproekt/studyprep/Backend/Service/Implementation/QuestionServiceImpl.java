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

import java.util.Base64;
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
        byte[] imageBytes = null;
        if (questionDto.image() != null && !questionDto.image().isEmpty()) {
            imageBytes = Base64.getDecoder().decode(questionDto.image());
        }

        TextQuestion question = new TextQuestion(
                questionDto.questionText(),
                questionDto.correctAnswer(),
                null, // This will be set later
                imageBytes
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
        Question question = questionRepository.findById(questionDto.questionId()).orElseThrow(
                () -> new RuntimeException("Question not found")
        );

        if (question instanceof SingleChoiceQuestion singleChoiceQuestion) {
            singleChoiceQuestion.setQuestionText(questionDto.questionText());
            singleChoiceQuestion.setAnswerOption1(questionDto.answerOptions().get(0));
            singleChoiceQuestion.setAnswerOption2(questionDto.answerOptions().get(1));
            singleChoiceQuestion.setAnswerOption3(questionDto.answerOptions().get(2));
            singleChoiceQuestion.setAnswerOption4(questionDto.answerOptions().get(3));
            singleChoiceQuestion.setCorrectAnswer(questionDto.correctAnswer());
            singleChoiceQuestion.setImage(questionDto.image());

            questionRepository.save(singleChoiceQuestion);

            return singleChoiceQuestion;
        }

        throw new RuntimeException("Question type not found");
    }

    @Override
    public Question editMultipleQuestion(MultipleChoiceQuestionDto questionDto) {
        Question question = questionRepository.findById(questionDto.questionId()).orElseThrow(
                () -> new RuntimeException("Question not found")
        );

        if (question instanceof MultipleChoiceQuestion multipleChoiceQuestion) {
            multipleChoiceQuestion.setQuestionText(questionDto.questionText());
            multipleChoiceQuestion.setAnswerOption1(questionDto.answerOptions().get(0));
            multipleChoiceQuestion.setAnswerOption2(questionDto.answerOptions().get(1));
            multipleChoiceQuestion.setAnswerOption3(questionDto.answerOptions().get(2));
            multipleChoiceQuestion.setAnswerOption4(questionDto.answerOptions().get(3));
            multipleChoiceQuestion.setCorrect1(questionDto.isCorrect().get(0));
            multipleChoiceQuestion.setCorrect2(questionDto.isCorrect().get(1));
            multipleChoiceQuestion.setCorrect3(questionDto.isCorrect().get(2));
            multipleChoiceQuestion.setCorrect4(questionDto.isCorrect().get(3));
            multipleChoiceQuestion.setImage(questionDto.image());

            questionRepository.save(multipleChoiceQuestion);

            return multipleChoiceQuestion;
        }

        throw new RuntimeException("Question type not found");
    }

    @Override
    public Question editBoolQuestion(BoolQuestionDto questionDto) {
        Question question = questionRepository.findById(questionDto.questionId()).orElseThrow(
                () -> new RuntimeException("Question not found")
        );

        if (question instanceof BoolQuestion boolQuestion) {
            boolQuestion.setQuestionText(questionDto.questionText());
            boolQuestion.setCorrectAnswer(questionDto.correctAnswer());
            boolQuestion.setImage(questionDto.image());

            questionRepository.save(boolQuestion);

            return boolQuestion;
        }

        throw new RuntimeException("Question type not found");
    }

    @Override
    public Question editTextQuestion(TextQuestionDto questionDto) {
        Question question = questionRepository.findById(questionDto.questionId()).orElseThrow(
                () -> new RuntimeException("Question not found")
        );

        if (question instanceof TextQuestion textQuestion) {
            textQuestion.setQuestionText(questionDto.questionText());
            textQuestion.setCorrectAnswer(questionDto.correctAnswer());

            byte[] imageBytes = null;
            if (questionDto.image() != null && !questionDto.image().isEmpty()) {
                imageBytes = Base64.getDecoder().decode(questionDto.image());
            }
            textQuestion.setImage(imageBytes);

            questionRepository.save(textQuestion);

            return textQuestion;
        }

        throw new RuntimeException("Question type not found");
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
