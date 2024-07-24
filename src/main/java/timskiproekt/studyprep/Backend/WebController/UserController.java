package timskiproekt.studyprep.Backend.WebController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import timskiproekt.studyprep.Backend.Model.entities.Attempt;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.User;
import timskiproekt.studyprep.Backend.Service.AttemptService;
import timskiproekt.studyprep.Backend.Service.QuizService;
import timskiproekt.studyprep.Backend.Service.UserService;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AttemptService attemptService;
    @Autowired
    private QuizService quizService;

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> findById(@PathVariable int id) {
        Optional<User> userOpt = userService.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            List<Attempt> attempts = attemptService.UserAttempts(user);
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("attempts", attempts);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    

    @GetMapping("/leaderboard/{quizId}")
    public Optional<List<Attempt>> getLeaderboard(@PathVariable int quizId){
        Optional<Quiz> q = quizService.findById(quizId);
        return attemptService.findAllBySubjectId(q);
    }

    @PostMapping("/attempts")
    public ResponseEntity<Attempt> saveAttempt(@RequestBody Attempt attempt) {
        Attempt savedAttempt = attemptService.saveAttempt(attempt);
        return new ResponseEntity<>(savedAttempt, HttpStatus.CREATED);
    }

}
