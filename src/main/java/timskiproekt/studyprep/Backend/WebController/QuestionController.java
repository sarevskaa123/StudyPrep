package timskiproekt.studyprep.Backend.WebController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import timskiproekt.studyprep.Backend.Model.DTO.*;
import timskiproekt.studyprep.Backend.Model.entities.*;
import timskiproekt.studyprep.Backend.Service.QuestionService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/all")
    public List<Question> findAll() {
        return questionService.findAll();
    }

    @GetMapping("/quiz/{quizId}")
    public List<Question> findAllQuestionsForQuiz(@PathVariable int quizId) {
        return questionService.findAllQuestionsByQuiz(quizId);
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<Question> findQuestionById(@PathVariable int questionId) {
        return questionService.findQuestionById(questionId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{quizId}/addSingle")
    public ResponseEntity<Question> addSingleQuestion(@RequestBody SingleChoiceQuestionDto questionDto) {
        return this.questionService.addSingleQuestion(questionDto).map(question -> ResponseEntity.ok().body(question))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PostMapping("/{quizId}/addMultiple")
    public ResponseEntity<Question> addMultipleQuestion(@RequestBody MultipleChoiceQuestionDto questionDto) {
        return this.questionService.addMultipleQuestion(questionDto)
                .map(question -> ResponseEntity.ok().body(question))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PostMapping("/{quizId}/addBool")
    public ResponseEntity<Question> addBoolQuestion(@RequestBody BoolQuestionDto questionDto) {
        return this.questionService.addBoolQuestion(questionDto)
                .map(question -> ResponseEntity.ok().body(question))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PostMapping("/{quizId}/addText")
    public ResponseEntity<Question> addTextQuestion(@RequestBody TextQuestionDto questionDto) {
        return this.questionService.addTextQuestion(questionDto)
                .map(question -> ResponseEntity.ok().body(question))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable int questionId) {
        questionService.deleteQuestionById(questionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{questionId}/editSingle")
    public ResponseEntity<Question> editQuestion(@RequestBody SingleChoiceQuestionDto questionDto) {
        Question result = this.questionService.editSingleQuestion(questionDto);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/{questionId}/editMultiple")
    public ResponseEntity<Question> editQuestion(@RequestBody MultipleChoiceQuestionDto questionDto) {
        Question result = this.questionService.editMultipleQuestion(questionDto);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/{questionId}/editBool")
    public ResponseEntity<Question> editQuestion(@RequestBody BoolQuestionDto questionDto) {
        Question result = this.questionService.editBoolQuestion(questionDto);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/{questionId}/editText")
    public ResponseEntity<Question> editQuestion(@RequestBody TextQuestionDto questionDto) {
        Question result = this.questionService.editTextQuestion(questionDto);
        return ResponseEntity.ok().body(result);
    }
}
