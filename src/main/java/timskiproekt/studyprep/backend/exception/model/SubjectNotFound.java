package timskiproekt.studyprep.backend.exception.model;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class SubjectNotFound extends RuntimeException{
    public SubjectNotFound(int id) {
        super(String.format("Subject with id: %d is not found", id));
    }


}
