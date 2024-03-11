package timskiproekt.studyprep.Backend.WebController;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import timskiproekt.studyprep.Backend.Model.entities.Subject;
import timskiproekt.studyprep.Backend.Service.SubjectService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/subjects")
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }


    @GetMapping
    public List<Subject> findAll() {
        return subjectService.findAll();
    }

}