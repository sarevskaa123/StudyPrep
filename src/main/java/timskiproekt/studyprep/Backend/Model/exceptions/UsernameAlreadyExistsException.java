package timskiproekt.studyprep.Backend.Model.exceptions;

public class UsernameAlreadyExistsException extends UserException{
    public UsernameAlreadyExistsException(String username) {
        super(String.format("User with username: %s already exists", username));
    }
}
