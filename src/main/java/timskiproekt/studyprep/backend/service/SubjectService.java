package timskiproekt.studyprep.backend.service;

import timskiproekt.studyprep.backend.model.entities.Quiz;
import timskiproekt.studyprep.backend.model.entities.Subject;
import timskiproekt.studyprep.backend.model.dto.subject.SubjectDTO;
import timskiproekt.studyprep.backend.model.dto.quiz.QuizDTO;

import java.util.List;
import java.util.Optional;

public interface SubjectService {

    List<Subject> findAll();

    Subject addSubject(SubjectDTO subjectDTO);
    void deleteSubject(int subjectId);
//    Subject findById(int subjectId);
    List<Quiz> findQuizzesBySubjectId(Subject subjectId);

    Quiz addQuizToSubject(int subjectId, QuizDTO quizDTO);

    Optional<Subject> findById(int id);
    Optional<Subject> save(Subject subject);

}
