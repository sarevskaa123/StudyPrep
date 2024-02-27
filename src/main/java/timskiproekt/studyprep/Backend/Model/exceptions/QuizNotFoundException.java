package timskiproekt.studyprep.Backend.Model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class QuizNotFoundException  extends RuntimeException{
    public QuizNotFoundException(int id) {
        super(String.format("Quiz with id: %d was not found", id));
    }

}
