package timskiproekt.studyprep.Backend.Model.exceptions;

public class UserAlreadyRegisteredWithEmailException extends UserException{
    public UserAlreadyRegisteredWithEmailException(String username) {
        super(String.format("User with email: %s already exists", username));
    }
}
