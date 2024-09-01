package timskiproekt.studyprep.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import timskiproekt.studyprep.backend.model.dto.user.RegisterDTO;
import timskiproekt.studyprep.backend.model.entities.User;
import timskiproekt.studyprep.backend.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/register")
public class RegisterController {

    private final UserService userService;


    public RegisterController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/user")
    public ResponseEntity<User> register(@RequestBody RegisterDTO registerDTO) {
        User user = userService.register(registerDTO);
        return ResponseEntity.ok().body(user);
    }


}