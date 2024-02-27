package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.Question;
import timskiproekt.studyprep.Backend.Model.TextQuestion;

import java.util.List;

public interface TextQuestionService {
    TextQuestion addTextQuestion();
    List<TextQuestion> findAllByQuiz(String id);
}
