package timskiproekt.studyprep.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import timskiproekt.studyprep.backend.exception.model.*;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {
            UsernameAlreadyExistsException.class,
            UserAlreadyRegisteredWithEmailException.class,
            PasswordsDoNotMatchException.class,
            InvalidUserCredentialsException.class
    })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public @ResponseBody ErrorResponse handleException(UserException ex) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
    }

    @ExceptionHandler(value = InternalStateException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public @ResponseBody ErrorResponse handleException(InternalStateException ex) {
        return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
    }

    @ExceptionHandler
    public @ResponseBody ErrorResponse handleException(QuizNotFoundException ex) {
        return new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage());
    }
}
