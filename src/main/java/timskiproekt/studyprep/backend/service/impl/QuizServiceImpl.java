package timskiproekt.studyprep.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.backend.model.dto.quiz.LeaderboardQuizDTO;
import timskiproekt.studyprep.backend.model.dto.quiz.QuizDTO;
import timskiproekt.studyprep.backend.model.dto.quiz.QuizRatingDto;
import timskiproekt.studyprep.backend.model.entities.Quiz;
import timskiproekt.studyprep.backend.model.entities.Rating;
import timskiproekt.studyprep.backend.model.entities.Subject;
import timskiproekt.studyprep.backend.model.entities.User;
import timskiproekt.studyprep.backend.exception.model.QuizNotFoundException;
import timskiproekt.studyprep.backend.exception.model.SubjectNotFound;
import timskiproekt.studyprep.backend.exception.model.UserNotFoundException;
import timskiproekt.studyprep.backend.repository.QuizRepository;
import timskiproekt.studyprep.backend.repository.RatingRepository;
import timskiproekt.studyprep.backend.repository.SubjectRepository;
import timskiproekt.studyprep.backend.repository.UserRepository;
import timskiproekt.studyprep.backend.service.QuizService;
import timskiproekt.studyprep.backend.service.utils.MapperService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class QuizServiceImpl implements QuizService {
    private final QuizRepository quizRepository;
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;
    private final RatingRepository ratingRepository;
    private final MapperService mapperService;

    @Override
    public List<Quiz> findAll() {
        return quizRepository.findAll();
    }

    @Override
    public List<LeaderboardQuizDTO> leaderboardFindAll() {
        List<Quiz> quizzes = quizRepository.findAll();

        return mapperService.mapQuizzesToLeaderboardQuizDTOs(quizzes);
    }

    @Override
    public List<QuizRatingDto> findAllWithRatings(int subjectId) {
        Subject subject = this.subjectRepository.findById(subjectId)
                .orElseThrow(() -> new SubjectNotFound(subjectId));

        List<Quiz> quizzes = quizRepository.findBySubject(subject);
        List<QuizRatingDto> quizRatingDtos = new ArrayList<>();

        for (Quiz quiz : quizzes) {
            int timesRated = 0;
            double averageRating = 0.0;
            List<Rating> ratings = ratingRepository.findByQuizQuizId(quiz.getQuizId());

            for (Rating rating : ratings) {
                timesRated++;
                averageRating += rating.getRatingScore();
            }

            averageRating = averageRating / timesRated;

            QuizRatingDto quizRatingDto = new QuizRatingDto(
                    quiz.getQuizId(),
                    quiz.getQuizTitle(),
                    timesRated,
                    averageRating
            );
            quizRatingDtos.add(quizRatingDto);
        }

        return quizRatingDtos;
    }

    @Override
    public void deleteById(int id) {
        quizRepository.deleteById(id);
    }

    @Override
    public Optional<Quiz> findById(int id) {
        return quizRepository.findById(id);
    }

    @Override
    public LeaderboardQuizDTO leaderboardFindById(int id) {
        Quiz quiz = quizRepository.findById(id).orElseThrow(() -> new QuizNotFoundException(id));
        return mapperService.mapQuizToLeaderboardQuizDTO(quiz);
    }

    @Override
    @Transactional
    public Optional<Quiz> save(String quizTitle, String quizDescription, int subjectId, int userId) {
        Subject subject = this.subjectRepository.findById(subjectId)
                .orElseThrow(() -> new SubjectNotFound(subjectId));

        User user = this.userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        this.quizRepository.deleteByQuizTitle(quizTitle);
        Quiz quiz = new Quiz(quizTitle, quizDescription, subject, user);

        this.quizRepository.save(quiz);

        return Optional.of(quiz);

    }

    @Override
    public Optional<Quiz> save(QuizDTO quizDto) {
        Subject subject = this.subjectRepository.findById(quizDto.getSubject())
                .orElseThrow(() -> new SubjectNotFound(quizDto.getSubject()));

        User user = userRepository.findById(quizDto.getUserId()).orElseThrow(RuntimeException::new);

        this.quizRepository.deleteByQuizTitle(quizDto.getQuizTitle());
        Quiz quiz = new Quiz(quizDto.getQuizTitle(), quizDto.getQuizDescription(), subject,user);
        this.quizRepository.save(quiz);

        return Optional.of(quiz);
    }


    @Override
    public Optional<Quiz> edit(int id, String quizTitle, String quizDescription, int subjectId) {
        Quiz quiz = this.quizRepository.findById(id).orElseThrow(() -> new QuizNotFoundException(id));

        quiz.setQuizTitle(quizTitle);
        quiz.setQuizDescription(quizDescription);

        Subject subject = this.subjectRepository.findById(subjectId)
                .orElseThrow(() -> new SubjectNotFound(subjectId));

        quiz.setSubjectId(subject);

        this.quizRepository.save(quiz);
        return Optional.of(quiz);

    }

    @Override
    public Optional<Quiz> edit(int id, QuizDTO quizDto) {
        Quiz quiz = this.quizRepository.findById(id).orElseThrow(() -> new QuizNotFoundException(id));

        quiz.setQuizTitle(quizDto.getQuizTitle());
        quiz.setQuizDescription(quizDto.getQuizDescription());

        Subject subject = this.subjectRepository.findById(quizDto.getSubject())
                .orElseThrow(() -> new SubjectNotFound(quizDto.getSubject()));

        quiz.setSubjectId(subject);

        this.quizRepository.save(quiz);
        return Optional.of(quiz);

    }

    @Override
    public List<Quiz> findBySubjectId(int subjectId) {
        Subject subject = this.subjectRepository.findById(subjectId)
                .orElseThrow(() -> new SubjectNotFound(subjectId));

        return quizRepository.findBySubject(subject);
    }

    @Override
    public Optional<Quiz> addQuizToSubject(int subjectId, QuizDTO quizDto) {
        return save(quizDto.getQuizTitle(), quizDto.getQuizDescription(), subjectId, quizDto.getUserId());
    }
}
