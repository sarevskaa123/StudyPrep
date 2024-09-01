package timskiproekt.studyprep.backend.model.dto.quiz;

public record LeaderboardQuizDTO(
        int quizId,
        String quizTitle,
        String subjectName,
        String description
) {
}
