package timskiproekt.studyprep.Backend.Model.DTO;

public record TextQuestionDto(
        String questionText,
        String questionType,
        int quizId,
        String image, // Base64 encoded string,
        int questionId,
        String correctAnswer
){}
