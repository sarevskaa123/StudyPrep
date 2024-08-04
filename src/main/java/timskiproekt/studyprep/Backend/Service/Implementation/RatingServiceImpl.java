package timskiproekt.studyprep.Backend.Service.Implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.Backend.Model.DTO.RatingDto;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.Rating;
import timskiproekt.studyprep.Backend.Model.entities.User;
import timskiproekt.studyprep.Backend.Repository.QuizRepository;
import timskiproekt.studyprep.Backend.Repository.RatingRepository;
import timskiproekt.studyprep.Backend.Repository.UserRepository;
import timskiproekt.studyprep.Backend.Service.RatingService;

import java.util.List;
import java.util.Optional;

@Service
public class RatingServiceImpl implements RatingService {
    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private UserRepository userRepository;


    @Override
    public List<Rating> findByQuiz(int quizId) {
        Quiz q = quizRepository.findById(quizId).orElseThrow(RuntimeException::new);
        //return ratingRepository.findAll();
        return ratingRepository.findByQuizQuizId(quizId);
    }

    @Override
    public List<Rating> findByUser(int userId) {
        User user = userRepository.findById(userId).orElseThrow(RuntimeException::new);
        return ratingRepository.findByUserId(user);
    }

    @Override
    public Optional<Rating> save(RatingDto ratingDto) {
        Quiz quiz = quizRepository.findById(ratingDto.quizId).orElseThrow(RuntimeException::new);
        User user = userRepository.findById(ratingDto.userId).orElseThrow(RuntimeException::new);

        Rating rating = new Rating(ratingDto.ratingScore, user, quiz);
        ratingRepository.save(rating);

        return Optional.of(rating);
    }

    @Override
    public Boolean findByQuizAndUser(int quizId, int userId) {
        Optional<Quiz> quiz = quizRepository.findById(quizId);
        Optional<User> user = userRepository.findById(quizId);

        Rating rating = ratingRepository.findByQuizQuizIdAndUserIdUserId(quizId, userId);
        return rating == null;

    }
}
