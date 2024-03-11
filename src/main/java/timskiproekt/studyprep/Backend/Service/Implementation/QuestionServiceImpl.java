package timskiproekt.studyprep.Backend.Service.Implementation;

import org.springframework.stereotype.Service;
import timskiproekt.studyprep.Backend.Model.DTO.BoolQuestionDto;
import timskiproekt.studyprep.Backend.Model.DTO.QuestionDto;
import timskiproekt.studyprep.Backend.Model.DTO.QuestionMultipleDto;
import timskiproekt.studyprep.Backend.Model.DTO.TextQuestionDto;
import timskiproekt.studyprep.Backend.Model.enums.QuestionType;
import timskiproekt.studyprep.Backend.Model.entities.*;
import timskiproekt.studyprep.Backend.Repository.*;
import timskiproekt.studyprep.Backend.Service.QuestionService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final BoolQuestionRepository boolQuestionRepository;
    private final TextQuestionRepository textQuestionRepository;

    public QuestionServiceImpl(QuizRepository quizRepository, QuestionRepository questionRepository, AnswerRepository answerRepository, BoolQuestionRepository boolQuestionRepository, TextQuestionRepository textQuestionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.boolQuestionRepository = boolQuestionRepository;
        this.textQuestionRepository = textQuestionRepository;
    }


    @Override
    public Optional<Question> addSinlgeQuestion(QuestionDto questionDto) {
        Quiz quiz = quizRepository.findById(questionDto.getQuizId()).orElseThrow(RuntimeException::new);

        String answer1 = questionDto.getAnswer1();
        String answer2 = questionDto.getAnswer2();
        String answer3 = questionDto.getAnswer3();
        String answer4 = questionDto.getAnswer4();
        int answerCorrect = questionDto.getAnswerCorrect();

        Question question = new Question(questionDto.getQuestionText(), quiz, QuestionType.SINGLE);
        questionRepository.save(question);

        Answer ans1 = new Answer(answer1, Boolean.FALSE, question);
        Answer ans2 = new Answer(answer2, Boolean.FALSE, question);
        Answer ans3 = new Answer(answer3, Boolean.FALSE, question);
        Answer ans4 = new Answer(answer4, Boolean.FALSE, question);

        if (answerCorrect == 1) {
            ans1.setIsCorrect(Boolean.TRUE);
        } else if (answerCorrect == 2) {
            ans2.setIsCorrect(Boolean.TRUE);
        } else if (answerCorrect == 3) {
            ans3.setIsCorrect(Boolean.TRUE);
        } else {
            ans4.setIsCorrect(Boolean.TRUE);
        }

        answerRepository.save(ans1);
        answerRepository.save(ans2);
        answerRepository.save(ans3);
        answerRepository.save(ans4);


        return Optional.of(question);
    }

    @Override
    public Optional<Question> addMultipleQuestion(QuestionMultipleDto questionDto) {
        Quiz quiz = quizRepository.findById(questionDto.getQuizId()).orElseThrow(RuntimeException::new);

        String answer1 = questionDto.getAnswer1();
        String answer2 = questionDto.getAnswer2();
        String answer3 = questionDto.getAnswer3();
        String answer4 = questionDto.getAnswer4();
        Boolean checked1 = questionDto.getChecked1();
        Boolean checked2 = questionDto.getChecked2();
        Boolean checked3 = questionDto.getChecked3();
        Boolean checked4 = questionDto.getChecked4();


        Question question = new Question(questionDto.getQuestionText(), quiz, QuestionType.MULTIPLE);
        questionRepository.save(question);

        Answer ans1 = new Answer(answer1, checked1, question);
        Answer ans2 = new Answer(answer2, checked2, question);
        Answer ans3 = new Answer(answer3, checked3, question);
        Answer ans4 = new Answer(answer4, checked4, question);


        answerRepository.save(ans1);
        answerRepository.save(ans2);
        answerRepository.save(ans3);
        answerRepository.save(ans4);

        return Optional.of(question);
    }

    @Override
    public List<Question> findAllSingleByQuiz(int id) {
        Quiz quiz = quizRepository.findById(id).orElseThrow(RuntimeException::new);
        return questionRepository.findAllByQuizAndQuestionType(quiz, QuestionType.SINGLE);
    }

    @Override
    public List<Question> findAllMultipleByQuiz(int id) {
        Quiz quiz = quizRepository.findById(id).orElseThrow(RuntimeException::new);
        return questionRepository.findAllByQuizAndQuestionType(quiz, QuestionType.MULTIPLE);
    }

    @Override
    public void deleteById(int id) {
        questionRepository.deleteById(id);
    }

    @Override
    public void deleteByIdBool(int id) {
        boolQuestionRepository.deleteById(id);
    }

    @Override
    public void deleteByIdText(int id) {
        textQuestionRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteByQuestionText(String questionText) {
        if(questionRepository.findByQuestionText(questionText).isPresent()){
            questionRepository.deleteByQuestionText(questionText);
        }
        if(boolQuestionRepository.findByBoolQuestionText(questionText).isPresent()){
            boolQuestionRepository.deleteByBoolQuestionText(questionText);
        }
        if(textQuestionRepository.findByQuestion(questionText).isPresent()){
            textQuestionRepository.deleteByQuestion(questionText);
        }
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
    public Optional<Question> findByQuestionText(String questionText) {
        return questionRepository.findByQuestionText(questionText);
    }

    @Override
    public Optional<BoolQuestion> findByQuestionTextBool(String questionText) {
        return boolQuestionRepository.findByBoolQuestionText(questionText);
    }

    @Override
    public Optional<TextQuestion> findByQuestionTextText(String questionText) {
        return textQuestionRepository.findByQuestion(questionText);
    }

    @Override
    public Optional<BoolQuestion> addBoolQuestion(BoolQuestionDto boolQuestionDto) {
        Quiz quiz = quizRepository.findById(boolQuestionDto.getQuizId()).orElseThrow(RuntimeException::new);

        BoolQuestion boolQuestion = new BoolQuestion(boolQuestionDto.getQuestionText(),boolQuestionDto.getIsCorrect(),quiz);

        boolQuestionRepository.save(boolQuestion);
        return Optional.of(boolQuestion);
    }

    @Override
    public List<BoolQuestion> findAllBoolByQuiz(int id) {
        Quiz quiz = quizRepository.findById(id).orElseThrow(RuntimeException::new);
        return boolQuestionRepository.findByQuiz(quiz);
    }

    @Override
    public Optional<TextQuestion> addTextQuestion(TextQuestionDto textQuestionDto) {
        Quiz quiz = quizRepository.findById(textQuestionDto.getQuizId()).orElseThrow(RuntimeException::new);

        TextQuestion textQuestion = new TextQuestion(textQuestionDto.getQuestionText(),textQuestionDto.getAnswerText(),quiz);

        textQuestionRepository.save(textQuestion);
        return Optional.of(textQuestion);
    }

    @Override
    public List<TextQuestion> findAllTextByQuiz(int id) {
        Quiz quiz = quizRepository.findById(id).orElseThrow(RuntimeException::new);
        return textQuestionRepository.findByQuiz(quiz);

    }

    @Override
    public List<String> findAllQuestionsByQuiz(int id) {
        Quiz quiz = quizRepository.findById(id).orElseThrow(RuntimeException::new);
        List<String> allQuestions = new ArrayList<>();

        List<Question> questions = questionRepository.findAllByQuiz(quiz);
        List<BoolQuestion> boolQuestions = boolQuestionRepository.findByQuiz(quiz);
        List<TextQuestion> textQuestions = textQuestionRepository.findByQuiz(quiz);

        for (Question question : questions) {
            allQuestions.add(question.getQuestionText());
        }
        for (BoolQuestion question : boolQuestions) {
            allQuestions.add(question.getBoolQuestionText());
        }
        for (TextQuestion question : textQuestions) {
            allQuestions.add(question.getQuestion());
        }


        return allQuestions;
    }
}
