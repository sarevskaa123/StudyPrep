package timskiproekt.studyprep.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import timskiproekt.studyprep.backend.model.dto.quiz.LeaderboardQuizDTO;
import timskiproekt.studyprep.backend.model.dto.quiz.QuizDTO;
import timskiproekt.studyprep.backend.model.dto.quiz.QuizRatingDto;
import timskiproekt.studyprep.backend.model.entities.Quiz;
import timskiproekt.studyprep.backend.service.QuizService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/quizzes")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping
    public List<Quiz> findAll() {
        return quizService.findAll();
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<LeaderboardQuizDTO>> leaderboardFindAll() {
        List<LeaderboardQuizDTO> quizDTOS = quizService.leaderboardFindAll();
        return ResponseEntity.ok().body(quizDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> findById(@PathVariable int id) {
        return quizService.findById(id)
                .map(quiz -> ResponseEntity.ok().body(quiz))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/leaderboard/{id}")
    public ResponseEntity<LeaderboardQuizDTO> leaderboardFindById(@PathVariable int id) {
        LeaderboardQuizDTO quizDTO = quizService.leaderboardFindById(id);
        return ResponseEntity.ok().body(quizDTO);
    }

    @GetMapping("/{id}/subjectId")
    public ResponseEntity<Map<String, String>> findSubjectIdByQuizId(@PathVariable int id) {
        return quizService.findById(id)
                .map(quiz -> {
                    Map<String, String> response = new HashMap<>();
                    response.put("subjectId", String.valueOf(quiz.getSubject().getSubjectId()));
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/subject/{id}")
    public ResponseEntity<List<Quiz>> findBySubjectId(@PathVariable int id) {
        List<Quiz> response = quizService.findBySubjectId(id);
        if (response.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/subject/{id}/ratings")
    public ResponseEntity<List<QuizRatingDto>> findBySubjectIdWithRatings(@PathVariable int id) {
        List<QuizRatingDto> response = quizService.findAllWithRatings(id);
        if (response.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable int id) {
        quizService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{subjectId}/add")
    public ResponseEntity<Quiz> addQuizToSubject(@PathVariable int subjectId, @RequestBody QuizDTO quizDto) {
        quizDto.setUserId(1);  // Ensure this is correctly set or obtained from the context
        return quizService.addQuizToSubject(subjectId, quizDto)
                .map(quiz -> ResponseEntity.ok().body(quiz))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Quiz> save(@PathVariable int id, @RequestBody QuizDTO quizDto) {
        return quizService.edit(id, quizDto)
                .map(quiz -> ResponseEntity.ok().body(quiz))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }
}
