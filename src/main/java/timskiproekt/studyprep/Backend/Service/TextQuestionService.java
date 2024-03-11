package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.entities.TextQuestion;

import java.util.List;

public interface TextQuestionService {
    TextQuestion addTextQuestion();
    List<TextQuestion> findAllByQuiz(String id);
}
