package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.entities.User;

public interface AuthService {
    User login(String username, String password);
}
