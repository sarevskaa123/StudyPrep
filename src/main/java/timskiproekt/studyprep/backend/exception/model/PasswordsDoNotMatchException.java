package timskiproekt.studyprep.backend.exception.model;

public class PasswordsDoNotMatchException extends UserException{

    public PasswordsDoNotMatchException() {
        super("Passwords do not match");
    }
}
