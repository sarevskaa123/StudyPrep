package timskiproekt.studyprep.backend.exception.model;

public class UserAlreadyRegisteredWithEmailException extends UserException{
    public UserAlreadyRegisteredWithEmailException(String username) {
        super(String.format("User with email: %s already exists", username));
    }
}
