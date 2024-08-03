package timskiproekt.studyprep.Backend.Model.exceptions;

public class PasswordsDoNotMatchException extends UserException{

    public PasswordsDoNotMatchException() {
        super("Passwords do not match");
    }
}
