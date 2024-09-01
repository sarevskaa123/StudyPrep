package timskiproekt.studyprep.backend.model.dto.quiz;

import lombok.Data;

@Data
public class QuizDTO {

    private String  quizTitle;
    private String quizDescription;
    private int subject;
    private int userId;


    public QuizDTO(){

    }
    public QuizDTO(String quizTitle, String quizDescription, int subject) {
        this.quizTitle = quizTitle;
        this.quizDescription = quizDescription;
        this.subject = subject;
    }

    public String getQuizName(){
        return quizTitle;
    }

}
