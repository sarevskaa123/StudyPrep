package timskiproekt.studyprep.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import timskiproekt.studyprep.backend.model.DTO.quiz.CommentDTO;
import timskiproekt.studyprep.backend.model.entities.Comment;
import timskiproekt.studyprep.backend.model.entities.Rating;
import timskiproekt.studyprep.backend.service.CommentService;
import timskiproekt.studyprep.backend.service.RatingService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{quizId}")
    public List<Comment> findAllforQuiz(@PathVariable int quizId) {
        return commentService.findByQuiz(quizId);
    }
    
    @PostMapping
    public ResponseEntity<Comment> addComment(@RequestBody CommentDTO commentDTO) {
        return commentService.save(commentDTO)
                .map(comment -> ResponseEntity.ok().body(comment))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }
    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable int commentId) {
        commentService.deleteCommentById(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
