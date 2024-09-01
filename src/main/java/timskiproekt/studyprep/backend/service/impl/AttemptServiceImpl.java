package timskiproekt.studyprep.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.backend.model.dto.attempt.AttemptDTO;
import timskiproekt.studyprep.backend.model.dto.attempt.LeaderboardAttemptDTO;
import timskiproekt.studyprep.backend.model.dto.attempt.ProfileAttemptDTO;
import timskiproekt.studyprep.backend.model.entities.*;
import timskiproekt.studyprep.backend.repository.AttemptRepository;
import timskiproekt.studyprep.backend.service.AttemptService;
import timskiproekt.studyprep.backend.service.utils.MapperService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttemptServiceImpl implements AttemptService {

    private final MapperService mapperService;
    private final AttemptRepository attemptRepository;

    @Override
    public List<ProfileAttemptDTO> getUserAttempts(User u) {
        List<Attempt> attempts = attemptRepository.findAllByUser(u);
        return mapperService.mapAttemptsToProfileAttemptDTOs(attempts);
    }

    @Override
    public AttemptDTO findById(int attemptId) {
        Attempt attempt = attemptRepository.findById(attemptId).orElseThrow();
        return mapperService.mapAttemptToAttemptDTO(attempt);
    }

    @Override
    public List<LeaderboardAttemptDTO> leaderboardFindAll(Quiz quiz) {
        List<Attempt> attempts = attemptRepository.findAllByQuizOrderByFinalResultDesc(quiz);
        return mapperService.mapAttemptsToLeaderboardAttemptDTOs(attempts);
    }

    @Override
    public Attempt saveAttempt(Attempt attempt) {
        return attemptRepository.save(attempt);
    }

//    private List<AttemptDTO> mapAttemptsToAttemptDTOs(List<Attempt> attempts) {
//        List<AttemptDTO> attemptDTOS = new ArrayList<>();
//
//        for (Attempt attempt : attempts) {
//            attemptDTOS.add(mapAttemptToAttemptDTO(attempt));
//        }
//
//        return attemptDTOS;
//    }
//
//    private AttemptDTO mapAttemptToAttemptDTO(Attempt attempt) {
//        AttemptDTO attemptDto = new AttemptDTO();
//        List<QuestionAttemptDTO> questionAttempts = new ArrayList<>();
//
//        attemptDto.setQuizName(attempt.getQuiz().getQuizTitle());
//        attemptDto.setSubjectName(attempt.getQuiz().getSubject().getSubjectName());
//        attemptDto.setMaxPoints(attempt.getHistoryQuiz().size());
//        attemptDto.setFinalResult(attempt.getFinalResult());
//        attemptDto.setStartTime(attempt.getStartTime());
//        attemptDto.setFinishTime(attempt.getFinishTime());
//
//        for (HistoryQuestion historyQuestion : attempt.getHistoryQuiz()) {
//            QuestionAttemptDTO questionAttemptDTO = new QuestionAttemptDTO();
//            Question question = questionRepository.findById(historyQuestion.getQuestionId()).orElseThrow();
//
//            questionAttemptDTO.setQuestionText(question.getQuestionText());
//            questionAttemptDTO.setUserAnswers(historyQuestion.getUserAnswers());
//            questionAttemptDTO.setPoints(historyQuestion.getPoints());
//            questionAttemptDTO.setCorrect(historyQuestion.getIsCorrect());
//            if (question.getImage() != null) {
//                questionAttemptDTO.setImage(question.getImage());
//            }
//            switch (question.getQuestionType()) {
//                case "Bool":
//                    BoolQuestion boolQuestion = (BoolQuestion) question;
//                    questionAttemptDTO.setCorrectAnswer(List.of(boolQuestion.getCorrectAnswer().toString()));
//                    break;
//                case "Single":
//                    SingleChoiceQuestion singleChoiceQuestion = (SingleChoiceQuestion) question;
//                    questionAttemptDTO.setCorrectAnswer(List.of(singleChoiceQuestion.getCorrectAnswer()));
//                    break;
//                case "Multiple":
//                    MultipleChoiceQuestion multipleChoiceQuestion = (MultipleChoiceQuestion) question;
//                    questionAttemptDTO.setCorrectAnswer(GetMultipleChoiceCorrectAnswer(multipleChoiceQuestion));
//                    break;
//                case "Text":
//                    TextQuestion textQuestion = (TextQuestion) question;
//                    questionAttemptDTO.setCorrectAnswer(List.of(textQuestion.getCorrectAnswer()));
//                    break;
//                default:
//                    throw new RuntimeException("Question Type does not exist");
//            }
//
//            questionAttempts.add(questionAttemptDTO);
//        }
//        attemptDto.setQuestions(questionAttempts);
//        return attemptDto;
//    }
//
//    private List<String> GetMultipleChoiceCorrectAnswer(MultipleChoiceQuestion multipleChoiceQuestion) {
//        List<String> answers = List.of(
//                multipleChoiceQuestion.getAnswerOption1(),
//                multipleChoiceQuestion.getAnswerOption2(),
//                multipleChoiceQuestion.getAnswerOption3(),
//                multipleChoiceQuestion.getAnswerOption4()
//        );
//
//        List<Boolean> correct = List.of(
//                multipleChoiceQuestion.isCorrect1(),
//                multipleChoiceQuestion.isCorrect2(),
//                multipleChoiceQuestion.isCorrect3(),
//                multipleChoiceQuestion.isCorrect4()
//        );
//
//        List<String> correctAnswers = new ArrayList<>();
//
//        for (int i = 0; i < 4; i++) {
//            if (correct.get(i)) {
//                correctAnswers.add(answers.get(i));
//            }
//        }
//
//        return correctAnswers;
//    }
}
