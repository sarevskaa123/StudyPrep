package timskiproekt.studyprep.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import timskiproekt.studyprep.backend.exception.model.QuizNotFoundException;
import timskiproekt.studyprep.backend.model.dto.attempt.AttemptDTO;
import timskiproekt.studyprep.backend.model.dto.attempt.LeaderboardAttemptDTO;
import timskiproekt.studyprep.backend.model.dto.user.UserProfileDTO;
import timskiproekt.studyprep.backend.model.entities.Attempt;
import timskiproekt.studyprep.backend.model.entities.User;
import timskiproekt.studyprep.backend.service.AttemptService;
import timskiproekt.studyprep.backend.service.QuizService;
import timskiproekt.studyprep.backend.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AttemptService attemptService;
    private final QuizService quizService;

    @GetMapping("/{id}")
    public ResponseEntity<UserProfileDTO> findById(@PathVariable int id) {
        UserProfileDTO userProfileDTO = userService.findProfile(id);
        return ResponseEntity.ok().body(userProfileDTO);
    }

    @GetMapping("/leaderboard/{quizId}")
    public List<LeaderboardAttemptDTO> getLeaderboard(@PathVariable int quizId){
        return quizService
                .findById(quizId)
                .map(attemptService::leaderboardFindAll)
                .orElseThrow(() -> new QuizNotFoundException(quizId));
    }

    @GetMapping("/attempt/{attemptId}")
    public ResponseEntity<AttemptDTO> getAttemptDetail(@PathVariable int attemptId) {
        try {
            AttemptDTO response = attemptService.findById(attemptId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException ex) {
            return ResponseEntity.internalServerError().build();
        }
    }


    @PostMapping("/attempts")
    public ResponseEntity<Attempt> saveAttempt(@RequestBody Attempt attempt) {
        Attempt savedAttempt = attemptService.saveAttempt(attempt);
        return new ResponseEntity<>(savedAttempt, HttpStatus.CREATED);
    }

}
