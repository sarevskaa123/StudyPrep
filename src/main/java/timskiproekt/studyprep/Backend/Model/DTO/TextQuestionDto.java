package timskiproekt.studyprep.Backend.Model.DTO;

public record TextQuestionDto(
        String questionText,
        String questionType,
        int quizId,
        byte[] image, // Base64 encoded string,
        int questionId,
        String correctAnswer
){}
