package timskiproekt.studyprep.backend.exception.model;

public class InvalidUserCredentialsException extends UserException {

    public InvalidUserCredentialsException() {
        super("Invalid username or password");
    }
}
