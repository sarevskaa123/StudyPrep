package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.BoolQuestion;
import timskiproekt.studyprep.Backend.Model.Question;

import java.util.List;

public interface BoolQuestionService {
    BoolQuestion addBoolQuestion();
    List<BoolQuestion> findAllByQuiz(String id);

}
