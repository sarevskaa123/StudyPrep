package timskiproekt.studyprep.Backend.Service;

import timskiproekt.studyprep.Backend.Model.DTO.LoginDTO;
import timskiproekt.studyprep.Backend.Model.User;

import java.util.Optional;

public interface AuthService {
    User login(String username, String password);
}
