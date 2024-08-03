package timskiproekt.studyprep.Backend.Model.exceptions;

public class InvalidUserCredentialsException extends UserException {

    public InvalidUserCredentialsException() {
        super("Invalid username or password");
    }
}
