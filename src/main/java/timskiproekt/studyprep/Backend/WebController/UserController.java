package timskiproekt.studyprep.Backend.WebController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import timskiproekt.studyprep.Backend.Model.DTO.LoginDTO;
import timskiproekt.studyprep.Backend.Model.DTO.RegisterDTO;
import timskiproekt.studyprep.Backend.Model.Response.LoginMessage;
import timskiproekt.studyprep.Backend.Model.User;
import timskiproekt.studyprep.Backend.Service.UserService;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/{id}")
    public Optional<User> findById(@PathVariable int id){
        return userService.findById(id);
    }

}
