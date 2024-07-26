package timskiproekt.studyprep.Backend.Service.Implementation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.Backend.Model.DTO.AttemptDTO;
import timskiproekt.studyprep.Backend.Model.DTO.QuestionAttemptDTO;
import timskiproekt.studyprep.Backend.Model.entities.*;
import timskiproekt.studyprep.Backend.Repository.AttemptRepository;
import timskiproekt.studyprep.Backend.Repository.QuestionRepository;
import timskiproekt.studyprep.Backend.Service.AttemptService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttemptServiceImpl implements AttemptService {
    private final AttemptRepository attemptRepository;
    private final QuestionRepository questionRepository;
    @Override
    public List<Attempt> UserAttempts(User u) {
        return attemptRepository.findAllByUser(Optional.ofNullable(u));
    }

    @Override
    public AttemptDTO FindById(int attemptId) {
        Attempt attempt = attemptRepository.findById(attemptId).orElseThrow();
        AttemptDTO attemptDto = new AttemptDTO();
        List<QuestionAttemptDTO> questionAttempts = new ArrayList<>();

        attemptDto.setQuizName(attempt.getQuiz().getQuizTitle());
        attemptDto.setSubjectName(attempt.getQuiz().getSubject().getSubjectName());
        attemptDto.setMaxPoints(attempt.getHistoryQuiz().size());
        attemptDto.setFinalResult(attempt.getFinalResult());
        attemptDto.setStartTime(attempt.getStartTime());
        attemptDto.setFinishTime(attempt.getFinishTime());

        for (HistoryQuestion historyQuestion : attempt.getHistoryQuiz()) {
            QuestionAttemptDTO questionAttemptDTO = new QuestionAttemptDTO();
            Question question = questionRepository.findById(historyQuestion.getQuestionId()).orElseThrow();

            questionAttemptDTO.setQuestionText(question.getQuestionText());
            questionAttemptDTO.setUserAnswers(historyQuestion.getUserAnswers());
            questionAttemptDTO.setPoints(historyQuestion.getPoints());
            questionAttemptDTO.setCorrect(historyQuestion.getIsCorrect());
            if (question.getImage() != null) {
                questionAttemptDTO.setImage(question.getImage());
            }
            switch (question.getQuestionType()) {
                case "Bool":
                    BoolQuestion boolQuestion = (BoolQuestion) question;
                    questionAttemptDTO.setCorrectAnswer(List.of(boolQuestion.getCorrectAnswer().toString()));
                    break;
                case "Single":
                    SingleChoiceQuestion singleChoiceQuestion = (SingleChoiceQuestion) question;
                    questionAttemptDTO.setCorrectAnswer(List.of(singleChoiceQuestion.getCorrectAnswer()));
                    break;
                case "Multiple":
                    MultipleChoiceQuestion multipleChoiceQuestion = (MultipleChoiceQuestion) question;
                    questionAttemptDTO.setCorrectAnswer(GetMultipleChoiceCorrectAnswer(multipleChoiceQuestion));
                    break;
                case "Text":
                    TextQuestion textQuestion = (TextQuestion) question;
                    questionAttemptDTO.setCorrectAnswer(List.of(textQuestion.getCorrectAnswer()));
                    break;
                default:
                    throw new RuntimeException("Question Type does not exist");
            }

            questionAttempts.add(questionAttemptDTO);
        }
        attemptDto.setQuestions(questionAttempts);
        return attemptDto;
    }

    @Override
    public Optional<List<Attempt>> findAllBySubjectId(Optional<Quiz> quiz) {
        return Optional.ofNullable(attemptRepository.findAllByQuizOrderByFinalResultDesc(quiz));
    }

    @Override
    public Attempt saveAttempt(Attempt attempt) {
        return attemptRepository.save(attempt);
    }

    @Override
    public Optional<Attempt> findById(int attemptId) {
        return attemptRepository.findById(attemptId);
    }

    private List<String> GetMultipleChoiceCorrectAnswer(MultipleChoiceQuestion multipleChoiceQuestion) {
        List<String> answers = List.of(
                multipleChoiceQuestion.getAnswerOption1(),
                multipleChoiceQuestion.getAnswerOption2(),
                multipleChoiceQuestion.getAnswerOption3(),
                multipleChoiceQuestion.getAnswerOption4()
        );

        List<Boolean> correct = List.of(
                multipleChoiceQuestion.isCorrect1(),
                multipleChoiceQuestion.isCorrect2(),
                multipleChoiceQuestion.isCorrect3(),
                multipleChoiceQuestion.isCorrect4()
        );

        List<String> correctAnswers = new ArrayList<>();

        for (int i = 0; i < 4; i++) {
            if (correct.get(i)) {
                correctAnswers.add(answers.get(i));
            }
        }

        return correctAnswers;
    }
}
