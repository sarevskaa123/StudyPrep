package timskiproekt.studyprep.Backend.Model.DTO;

public record TextQuestionDto(
        String questionText,
        String questionType,
        int quizId,
        int questionId,
        String correctAnswer
){}

