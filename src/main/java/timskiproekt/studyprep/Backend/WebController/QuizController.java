package timskiproekt.studyprep.Backend.WebController;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import timskiproekt.studyprep.Backend.Model.DTO.QuizDto;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.User;
import timskiproekt.studyprep.Backend.Service.QuizService;
import timskiproekt.studyprep.Backend.Service.UserService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/quizzes")
public class QuizController {

    private final QuizService quizService;
    private final UserService userService;

    public QuizController(QuizService quizService, UserService userService) {
        this.quizService = quizService;
        this.userService = userService;
    }

    @GetMapping
    public List<Quiz> findAll(){
        return quizService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> findById(@PathVariable int id) {
        return this.quizService.findById(id)
                .map(quiz -> ResponseEntity.ok().body(quiz))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/subject/{id}")
    public ResponseEntity<List<Quiz>> findBySubjectId(@PathVariable int id) {
        List<Quiz> response = this.quizService.findBySubjectId(id);
        if (response.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response);
    }

//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<List<Quiz>> deleteById(@PathVariable int id) {
//        this.quizService.deleteById(id);
//        if (this.quizService.findBySubjectId(id).isEmpty()) return ResponseEntity.ok().build();
//        return ResponseEntity.badRequest().build();
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable int id) {
        this.quizService.deleteById(id);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/{subjectId}/add")
    public ResponseEntity<Quiz> addQuizToSubject(@PathVariable int subjectId, @RequestBody QuizDto quizDto) {
        quizDto.setUserId(1);
        return this.quizService.addQuizToSubject(subjectId, quizDto)
                .map(quiz -> ResponseEntity.ok().body(quiz))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Quiz> save(@PathVariable int id, @RequestBody QuizDto quizDto) {
        return this.quizService.edit(id, quizDto)
                .map(quiz -> ResponseEntity.ok().body(quiz))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }
}
