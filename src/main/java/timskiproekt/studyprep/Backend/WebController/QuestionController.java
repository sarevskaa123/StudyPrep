package timskiproekt.studyprep.Backend.WebController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import timskiproekt.studyprep.Backend.Model.entities.BoolQuestion;
import timskiproekt.studyprep.Backend.Model.DTO.*;
import timskiproekt.studyprep.Backend.Model.entities.Question;
import timskiproekt.studyprep.Backend.Model.entities.TextQuestion;
import timskiproekt.studyprep.Backend.Service.QuestionService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/question")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/all")
    public List<Question> findAll() {
        return questionService.findAll();
    }

    @GetMapping("/allQuestions/{id}")
    public List<String> findAllQuestionsForQuiz(@PathVariable int id) {
        return questionService.findAllQuestionsByQuiz(id);
    }

    @GetMapping("/multiple/{id}")
    public List<Question> findAllMultiple(@PathVariable int id) {

        return questionService.findAllMultipleByQuiz(id);
    }

    @GetMapping("/bool/{id}")
    public List<BoolQuestion> findAllBool(@PathVariable int id) {

        return questionService.findAllBoolByQuiz(id);
    }

    @GetMapping("/text/{id}")
    public List<TextQuestion> findAllText(@PathVariable int id) {

        return questionService.findAllTextByQuiz(id);
    }

    @GetMapping("/single/{id}")
    public List<Question> findAllSingle(@PathVariable int id) {
        return questionService.findAllSingleByQuiz(id);
    }

    @PostMapping("/{id}/addSingle")
    public ResponseEntity<Question> addSingleQuestion(@RequestBody QuestionDto questionDto, @PathVariable int id) {
        return this.questionService.addSinlgeQuestion(questionDto)
                .map(question -> ResponseEntity.ok().body(question))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PostMapping("/{id}/addMultiple")
    public ResponseEntity<Question> addMultipleQuestion(@RequestBody QuestionMultipleDto questionMultipleDto, @PathVariable int id) {
        return this.questionService.addMultipleQuestion(questionMultipleDto)
                .map(question -> ResponseEntity.ok().body(question))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PostMapping("/{id}/addBool")
    public ResponseEntity<BoolQuestion> addBoolQuestion(@RequestBody BoolQuestionDto boolQuestionDto, @PathVariable int id) {
        return this.questionService.addBoolQuestion(boolQuestionDto)
                .map(question -> ResponseEntity.ok().body(question))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PostMapping("/{id}/addText")
    public ResponseEntity<TextQuestion> addTextQuestion(@RequestBody TextQuestionDto textQuestionDto, @PathVariable int id) {
        return this.questionService.addTextQuestion(textQuestionDto)
                .map(question -> ResponseEntity.ok().body(question))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteById(@PathVariable int id) {
        this.questionService.deleteById(id);
        if (this.questionService.findById(id).isEmpty()) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/deleteQuestions/{questionText}")
    public ResponseEntity deleteByText(@PathVariable String questionText) {
        this.questionService.deleteByQuestionText(questionText);
        if (this.questionService.findByQuestionText(questionText).isEmpty()) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/deleteBool/{id}")
    public ResponseEntity deleteByIdBool(@PathVariable int id) {
        this.questionService.deleteByIdBool(id);
        if (this.questionService.findById(id).isEmpty()) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/deleteText/{id}")
    public ResponseEntity deleteByIdText(@PathVariable int id) {
        this.questionService.deleteByIdText(id);
        if (this.questionService.findById(id).isEmpty()) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }


}
