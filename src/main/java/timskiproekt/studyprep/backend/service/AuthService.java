package timskiproekt.studyprep.backend.service;

import timskiproekt.studyprep.backend.model.entities.User;

public interface AuthService {
    User login(String username, String password);
}
