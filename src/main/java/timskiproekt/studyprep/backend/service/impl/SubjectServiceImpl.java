package timskiproekt.studyprep.backend.service.impl;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import timskiproekt.studyprep.backend.model.dto.quiz.QuizDTO;
import timskiproekt.studyprep.backend.model.entities.Quiz;
import timskiproekt.studyprep.backend.model.entities.Subject;
import timskiproekt.studyprep.backend.model.entities.User;
import timskiproekt.studyprep.backend.repository.QuizRepository;
import timskiproekt.studyprep.backend.repository.SubjectRepository;
import timskiproekt.studyprep.backend.repository.UserRepository;
import timskiproekt.studyprep.backend.service.SubjectService;

import java.util.List;
import java.util.Optional;

import timskiproekt.studyprep.backend.model.dto.subject.SubjectDTO;


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
    public Quiz addQuizToSubject(int subjectId, QuizDTO quizDTO) {
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
