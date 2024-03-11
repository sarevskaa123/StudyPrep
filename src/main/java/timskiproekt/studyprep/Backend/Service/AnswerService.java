package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.entities.Answer;

import java.util.List;

public interface AnswerService {
    Answer addAnswer();
    List<Answer> findAllByQuestion(String id);
}
