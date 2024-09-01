package timskiproekt.studyprep.backend.exception.model;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Integer userId) {
        super(String.format("User not found userId: %s", userId));
    }
}
