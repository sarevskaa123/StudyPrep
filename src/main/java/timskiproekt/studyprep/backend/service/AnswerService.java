package timskiproekt.studyprep.backend.service;

import timskiproekt.studyprep.backend.model.entities.Answer;

import java.util.List;

public interface AnswerService {
    Answer addAnswer();
    List<Answer> findAllByQuestion(String id);
}
