package timskiproekt.studyprep.backend.model.dto.question;

public record BoolQuestionDto(
        String questionText,
        byte[] image,
        String questionType,
        int quizId,
        int questionId,
        boolean correctAnswer
) {}
