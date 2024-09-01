package timskiproekt.studyprep.backend.model.dto.user;

import timskiproekt.studyprep.backend.model.dto.attempt.ProfileAttemptDTO;

import java.sql.Timestamp;
import java.util.List;

public record UserProfileDTO (
        String username,
        Timestamp registerDate,
        String email,
        List<ProfileAttemptDTO> attempts
){
}
