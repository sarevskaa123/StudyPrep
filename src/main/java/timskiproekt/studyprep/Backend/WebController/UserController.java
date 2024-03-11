package timskiproekt.studyprep.Backend.WebController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import timskiproekt.studyprep.Backend.Model.entities.User;
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
