package timskiproekt.studyprep.Backend.WebController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import timskiproekt.studyprep.Backend.Model.DTO.QuizDto;
import timskiproekt.studyprep.Backend.Model.entities.Quiz;
import timskiproekt.studyprep.Backend.Model.entities.Subject;
import timskiproekt.studyprep.Backend.Service.SubjectService;
import timskiproekt.studyprep.Backend.Service.QuizService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/subjects")
public class SubjectController {

    private final SubjectService subjectService;
    private final QuizService quizService;

    public SubjectController(SubjectService subjectService, QuizService quizService) {
        this.subjectService = subjectService;
        this.quizService = quizService;
    }

    @GetMapping
    public List<Subject> findAll() {
        return subjectService.findAll();
    }

    @GetMapping("/{subjectId}")
    public ResponseEntity<Subject> findById(@PathVariable int subjectId) {
        return this.subjectService.findById(subjectId)
                .map(subject -> ResponseEntity.ok().body(subject))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Subject> addSubject(@RequestBody Subject subject) {
        return this.subjectService.save(subject)
                .map(savedSubject -> ResponseEntity.ok().body(savedSubject))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{subjectId}")
    public ResponseEntity deleteById(@PathVariable int subjectId) {
        this.subjectService.deleteSubject(subjectId);
        if (this.subjectService.findById(subjectId).isEmpty()) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/{subjectId}/quizzes")
    public ResponseEntity<Quiz> addQuizToSubject(@PathVariable int subjectId, @RequestBody QuizDto quizDto) {
        return this.quizService.addQuizToSubject(subjectId, quizDto)
                .map(quiz -> ResponseEntity.ok().body(quiz))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }
}
