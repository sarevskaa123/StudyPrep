package timskiproekt.studyprep.Backend.Service.Implementation;

import org.springframework.stereotype.Service;
import timskiproekt.studyprep.Backend.Model.DTO.QuizDto;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.Subject;
import timskiproekt.studyprep.Backend.Model.entities.User;
import timskiproekt.studyprep.Backend.Model.exceptions.QuizNotFoundException;
import timskiproekt.studyprep.Backend.Model.exceptions.SubjectNotFound;
import timskiproekt.studyprep.Backend.Model.exceptions.UserNotFoundException;
import timskiproekt.studyprep.Backend.Repository.QuizRepository;
import timskiproekt.studyprep.Backend.Repository.SubjectRepository;
import timskiproekt.studyprep.Backend.Repository.UserRepository;
import timskiproekt.studyprep.Backend.Service.QuizService;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class QuizServiceImpl implements QuizService {
    private final QuizRepository quizRepository;
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;

    public QuizServiceImpl(QuizRepository quizRepository, SubjectRepository subjectRepository, UserRepository userRepository) {
        this.quizRepository = quizRepository;
        this.subjectRepository = subjectRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Quiz> findAll() {
        return quizRepository.findAll();
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

        return quizRepository.findBySubjectId(subject);
    }

    @Override
    public Optional<Quiz> addQuizToSubject(int subjectId, QuizDto quizDto) {
        return save(quizDto.getQuizTitle(), quizDto.getQuizDescription(), subjectId, quizDto.getUserId());
    }
}
