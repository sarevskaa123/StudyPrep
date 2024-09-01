package timskiproekt.studyprep.backend.model.entities;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
public class HistoryQuestion implements Serializable {
    private Integer questionId;
    private List<String> userAnswers;
    private Float points;
    private Boolean isCorrect;
 }
