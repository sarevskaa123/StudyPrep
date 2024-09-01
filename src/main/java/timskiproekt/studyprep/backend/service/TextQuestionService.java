package timskiproekt.studyprep.backend.service;

import timskiproekt.studyprep.backend.model.entities.TextQuestion;

import java.util.List;

public interface TextQuestionService {
    TextQuestion addTextQuestion();
    List<TextQuestion> findAllByQuiz(String id);
}
