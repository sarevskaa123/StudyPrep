package timskiproekt.studyprep.backend.model.dto.question;

import java.util.ArrayList;

public record MultipleChoiceQuestionDto(
        String questionText,
        String questionType,
        int quizId,
        byte[] image,
        int questionId,
        ArrayList<String> answerOptions,
        ArrayList<Boolean> isCorrect
){}
