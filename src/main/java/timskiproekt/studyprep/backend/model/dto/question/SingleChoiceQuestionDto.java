package timskiproekt.studyprep.backend.model.dto.question;

import java.util.ArrayList;

public record SingleChoiceQuestionDto(
        String questionText,
        String questionType,
        byte[] image,
        int quizId,
        int questionId,
        ArrayList<String> answerOptions,
        String correctAnswer
){}
