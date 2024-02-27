package timskiproekt.studyprep.Backend.WebController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import timskiproekt.studyprep.Backend.Model.DTO.QuizDto;
import timskiproekt.studyprep.Backend.Model.Quiz;
import timskiproekt.studyprep.Backend.Service.QuizService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }


    @GetMapping("/quizzes")
    public List<Quiz> findAll(){
        return quizService.findAll();
    }

    @GetMapping("/quiz/{id}")
    public ResponseEntity<Quiz> findById(@PathVariable int id) {
        return this.quizService.findById(id)
                .map(quiz -> ResponseEntity.ok().body(quiz))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @DeleteMapping("/quiz/delete/{id}")
    public ResponseEntity deleteById(@PathVariable int id) {
        this.quizService.deleteById(id);
        if (this.quizService.findById(id).isEmpty()) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }


    @PostMapping("/addQuiz")
    public ResponseEntity<Quiz> addQuiz(@RequestBody QuizDto quizDto) {
        return this.quizService.save(quizDto)
                .map(quiz -> ResponseEntity.ok().body(quiz))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("/editQuiz/{id}")
    public ResponseEntity<Quiz> save(@PathVariable int id, @RequestBody QuizDto quizDto) {
        return this.quizService.edit(id, quizDto)
                .map(quiz -> ResponseEntity.ok().body(quiz))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }



}
