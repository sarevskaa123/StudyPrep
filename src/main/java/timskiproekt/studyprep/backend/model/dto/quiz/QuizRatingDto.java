package timskiproekt.studyprep.backend.model.dto.quiz;

public record QuizRatingDto(
        int quizId,
        String quizTitle,
        int totalTimesRated,
        double averageRating
        ) {
}
