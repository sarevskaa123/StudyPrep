package timskiproekt.studyprep.Backend.Model.Response;

import lombok.Data;

@Data
public class LoginMessage {
    String message;
    Boolean status;

    public LoginMessage(String message, Boolean status) {
        this.message = message;
        this.status = status;
    }

    public LoginMessage() {
    }
}
