package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.Answer;
import timskiproekt.studyprep.Backend.Model.Question;

import java.util.List;

public interface AnswerService {
    Answer addAnswer();
    List<Answer> findAllByQuestion(String id);
}
