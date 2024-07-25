package timskiproekt.studyprep.Backend.Model.DTO;

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
