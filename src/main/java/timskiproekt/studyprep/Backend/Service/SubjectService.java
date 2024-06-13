package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.Subject;
import timskiproekt.studyprep.Backend.Model.DTO.SubjectDTO;
import timskiproekt.studyprep.Backend.Model.DTO.QuizDto;

import java.util.List;
import java.util.Optional;

public interface SubjectService {

    List<Subject> findAll();

    Subject addSubject(SubjectDTO subjectDTO);
    void deleteSubject(int subjectId);
//    Subject findById(int subjectId);
    List<Quiz> findQuizzesBySubjectId(Subject subjectId);

    Quiz addQuizToSubject(int subjectId, QuizDto quizDTO);

    Optional<Subject> findById(int id);
    Optional<Subject> save(Subject subject);

}
