package timskiproekt.studyprep.Backend.Model.DTO;

public record BoolQuestionDto(
        String questionText,
        String questionType,
        int quizId,
        int questionId,
        boolean correctAnswer
) {}
