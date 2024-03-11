package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.entities.BoolQuestion;

import java.util.List;

public interface BoolQuestionService {
    BoolQuestion addBoolQuestion();
    List<BoolQuestion> findAllByQuiz(String id);

}
