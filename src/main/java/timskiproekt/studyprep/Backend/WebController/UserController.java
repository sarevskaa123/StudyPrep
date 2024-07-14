package timskiproekt.studyprep.Backend.WebController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import timskiproekt.studyprep.Backend.Model.entities.Attempt;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.User;
import timskiproekt.studyprep.Backend.Service.AttemptService;
import timskiproekt.studyprep.Backend.Service.QuizService;
import timskiproekt.studyprep.Backend.Service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public List<Object> findById(@PathVariable int id){
        Optional<User> u = userService.findById(id);
        Optional<List<Attempt>> attemptList = attemptService.UserAttempts(u);
        List<Object> userWithAttempts = new ArrayList<>();
        userWithAttempts.add(u);
        userWithAttempts.add(attemptList);
        return userWithAttempts;
    }

    @GetMapping("/leaderboard/{quizId}")
    public Optional<List<Attempt>> getLeaderboard(@PathVariable int quizId){
        Optional<Quiz> q = quizService.findById(quizId);
        Optional<List<Attempt>> attemptList = attemptService.findAllBySubjectId(q);
        return attemptList;
    }

}
