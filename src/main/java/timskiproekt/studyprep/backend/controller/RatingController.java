package timskiproekt.studyprep.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import timskiproekt.studyprep.backend.model.dto.quiz.RatingDto;
import timskiproekt.studyprep.backend.model.entities.Rating;
import timskiproekt.studyprep.backend.service.RatingService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/rating")
public class RatingController {
    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @GetMapping("/{quizId}")
    public List<Rating> findAllforQuiz(@PathVariable int quizId) {
        return ratingService.findByQuiz(quizId);
    }

    @GetMapping("user/{userId}")
    public List<Rating> findAllforUser(@PathVariable int userId) {
        return ratingService.findByUser(userId);
    }

    @GetMapping("/{quizId}/{userId}")
    public ResponseEntity<Boolean> canLeaveRating(@PathVariable int quizId, @PathVariable int userId){
        Boolean bool = ratingService.findByQuizAndUser(quizId,userId);
        return ResponseEntity.ok().body(bool);
    }
    @PostMapping
    public ResponseEntity<Rating> addRating(@RequestBody RatingDto ratingDto) {
        return ratingService.save(ratingDto)
                .map(rating -> ResponseEntity.ok().body(rating))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

}
