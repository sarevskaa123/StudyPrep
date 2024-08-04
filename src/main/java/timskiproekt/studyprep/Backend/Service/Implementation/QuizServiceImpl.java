package timskiproekt.studyprep.Backend.Service.Implementation;

import org.springframework.stereotype.Service;
import timskiproekt.studyprep.Backend.Model.DTO.QuizDto;
import timskiproekt.studyprep.Backend.Model.DTO.QuizRatingDto;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.Rating;
import timskiproekt.studyprep.Backend.Model.entities.Subject;
import timskiproekt.studyprep.Backend.Model.entities.User;
import timskiproekt.studyprep.Backend.Model.exceptions.QuizNotFoundException;
import timskiproekt.studyprep.Backend.Model.exceptions.SubjectNotFound;
import timskiproekt.studyprep.Backend.Model.exceptions.UserNotFoundException;
import timskiproekt.studyprep.Backend.Repository.QuizRepository;
import timskiproekt.studyprep.Backend.Repository.RatingRepository;
import timskiproekt.studyprep.Backend.Repository.SubjectRepository;
import timskiproekt.studyprep.Backend.Repository.UserRepository;
import timskiproekt.studyprep.Backend.Service.QuizService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizServiceImpl implements QuizService {
    private final QuizRepository quizRepository;
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;
    private final RatingRepository ratingRepository;

    public QuizServiceImpl(QuizRepository quizRepository, SubjectRepository subjectRepository, UserRepository userRepository, RatingRepository ratingRepository) {
        this.quizRepository = quizRepository;
        this.subjectRepository = subjectRepository;
        this.userRepository = userRepository;
        this.ratingRepository = ratingRepository;
    }

    @Override
    public List<Quiz> findAll() {
        return quizRepository.findAll();
    }

    @Override
    public List<QuizRatingDto> findAllWithRatings(int subjectId) {
        Subject subject = this.subjectRepository.findById(subjectId)
                .orElseThrow(() -> new SubjectNotFound(subjectId));

        List<Quiz> quizzes = quizRepository.findBySubject(subject);
        List<QuizRatingDto> quizRatingDtos = new ArrayList<>();

        for(int i=0;i<quizzes.size();i++){
            int timesRated = 0;
            double averageRating = 0.0;
            List<Rating> ratings = ratingRepository.findByQuizQuizId(quizzes.get(i).getQuizId());

            for(int j=0;j<ratings.size();j++){
                timesRated++;
                averageRating+= ratings.get(j).getRatingScore();
            }

            averageRating = averageRating/timesRated;

            QuizRatingDto quizRatingDto = new QuizRatingDto(quizzes.get(i),timesRated,averageRating);
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
    public Optional<Quiz> save(QuizDto quizDto) {
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
    public Optional<Quiz> edit(int id, QuizDto quizDto) {
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
    public Optional<Quiz> addQuizToSubject(int subjectId, QuizDto quizDto) {
        return save(quizDto.getQuizTitle(), quizDto.getQuizDescription(), subjectId, quizDto.getUserId());
    }
}
