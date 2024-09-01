package timskiproekt.studyprep.backend.service.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.backend.model.dto.attempt.AttemptDTO;
import timskiproekt.studyprep.backend.model.dto.attempt.LeaderboardAttemptDTO;
import timskiproekt.studyprep.backend.model.dto.attempt.ProfileAttemptDTO;
import timskiproekt.studyprep.backend.model.dto.attempt.QuestionAttemptDTO;
import timskiproekt.studyprep.backend.model.dto.quiz.LeaderboardQuizDTO;
import timskiproekt.studyprep.backend.model.entities.*;
import timskiproekt.studyprep.backend.repository.QuestionRepository;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MapperServiceImpl implements MapperService {

    private final QuestionRepository questionRepository;

    @Override
    public List<LeaderboardQuizDTO> mapQuizzesToLeaderboardQuizDTOs(List<Quiz> quizzes) {
        List<LeaderboardQuizDTO> quizDTOS = new ArrayList<>();

        for (Quiz quiz : quizzes) {
            LeaderboardQuizDTO quizDTO = mapQuizToLeaderboardQuizDTO(quiz);
            quizDTOS.add(quizDTO);
        }

        return quizDTOS;
    }

    @Override
    public LeaderboardQuizDTO mapQuizToLeaderboardQuizDTO(Quiz quiz) {
        return new LeaderboardQuizDTO(
                quiz.getQuizId(),
                quiz.getQuizTitle(),
                quiz.getSubject().getSubjectName(),
                quiz.getQuizDescription()
        );
    }

    @Override
    public List<ProfileAttemptDTO> mapAttemptsToProfileAttemptDTOs(List<Attempt> attempts) {
        List<ProfileAttemptDTO> attemptDTOS = new ArrayList<>();

        for (Attempt attempt : attempts) {
            ProfileAttemptDTO attemptDTO = new ProfileAttemptDTO(
                    attempt.getAttemptId(),
                    attempt.getQuiz().getQuizTitle(),
                    attempt.getQuiz().getSubject().getSubjectName(),
                    attempt.getStartTime(),
                    attempt.getFinishTime(),
                    attempt.getFinalResult()
            );
            attemptDTOS.add(attemptDTO);
        }

        return attemptDTOS;
    }

    @Override
    public List<LeaderboardAttemptDTO> mapAttemptsToLeaderboardAttemptDTOs(List<Attempt> attempts) {
        List<LeaderboardAttemptDTO> attemptDTOS = new ArrayList<>();

        for (Attempt attempt : attempts) {
            LeaderboardAttemptDTO attemptDTO = new LeaderboardAttemptDTO(
                    attempt.getUser().getUsername(),
                    attempt.getStartTime(),
                    attempt.getFinishTime(),
                    attempt.getFinalResult()
            );
            attemptDTOS.add(attemptDTO);
        }

        return attemptDTOS;
    }

    @Override
    public List<AttemptDTO> mapAttemptsToAttemptDTOs(List<Attempt> attempts) {
        List<AttemptDTO> attemptDTOS = new ArrayList<>();

        for (Attempt attempt : attempts) {
            attemptDTOS.add(mapAttemptToAttemptDTO(attempt));
        }

        return attemptDTOS;
    }

    @Override
    public AttemptDTO mapAttemptToAttemptDTO(Attempt attempt) {
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
