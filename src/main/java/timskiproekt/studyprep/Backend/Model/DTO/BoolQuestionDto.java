package timskiproekt.studyprep.Backend.Model.DTO;

public record BoolQuestionDto(
        String questionText,
        byte[] image,
        String questionType,
        int quizId,
        int questionId,
        boolean correctAnswer
) {}
