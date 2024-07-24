package timskiproekt.studyprep.Backend.Service.Implementation;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.Backend.Model.DTO.QuizDto;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.Subject;
import timskiproekt.studyprep.Backend.Model.entities.User;
import timskiproekt.studyprep.Backend.Repository.QuizRepository;
import timskiproekt.studyprep.Backend.Repository.SubjectRepository;
import timskiproekt.studyprep.Backend.Repository.UserRepository;
import timskiproekt.studyprep.Backend.Service.SubjectService;

import java.util.List;
import java.util.Optional;

import timskiproekt.studyprep.Backend.Model.DTO.SubjectDTO;


@Service
public class SubjectServiceImpl implements SubjectService {

    private final SubjectRepository subjectRepository;
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;

    public SubjectServiceImpl(SubjectRepository subjectRepository, QuizRepository quizRepository, UserRepository userRepository) {
        this.subjectRepository = subjectRepository;
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Subject> findAll() {
        return subjectRepository.findAll();
    }

    @Override
    public Subject addSubject(SubjectDTO subjectDTO) {
        Subject subject = new Subject();
        subject.setSubjectName(subjectDTO.getSubjectName());
        return subjectRepository.save(subject);
    }

    @Override
    public void deleteSubject(int subjectId) {
        subjectRepository.deleteById(subjectId);
    }

    @Override
    public Optional<Subject> findById(int id) {
        return subjectRepository.findById(id);
    }

    @Override
    public Optional<Subject> save(Subject subject) {
        return Optional.of(subjectRepository.save(subject));
    }

    @Override
    public List<Quiz> findQuizzesBySubjectId(Subject subjectId) {
        return quizRepository.findBySubject(subjectId);
    }

    @Override
    public Quiz addQuizToSubject(int subjectId, QuizDto quizDTO) {
        // Fetch the subject from the database
        Optional<Subject> subjectOptional = subjectRepository.findById(subjectId);
        Subject subject = subjectOptional.orElseThrow(() -> new RuntimeException("Subject not found"));

        // Get the currently authenticated user
        Optional<User> userOptional = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        User user = userOptional.orElseThrow(() -> new RuntimeException("User not found"));

        // Create a new Quiz object
        Quiz quiz = new Quiz();
        quiz.setQuizTitle(quizDTO.getQuizTitle());
        quiz.setQuizDescription(quizDTO.getQuizDescription());
        quiz.setSubjectId(subject);
        quiz.setUserId(user);

        // Save the new quiz to the database
        return quizRepository.save(quiz);
    }





}
