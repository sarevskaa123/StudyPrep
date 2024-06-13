package timskiproekt.studyprep.Backend.Model.exceptions;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Integer userId) {
        super(String.format("User not found userId: %s", userId));
    }
}
